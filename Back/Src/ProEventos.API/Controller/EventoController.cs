using Microsoft.AspNetCore.Mvc;
using ProEventos.Repository.Context;
using ProEventos.Service.Dtos;
using ProEventos.Service.Interfaces;


namespace ProEventos.API.Controllers
{

    [ApiController] // Marca como API controller
    [Route("api/[controller]")] // Rota padrão: /api/nome-do-controller

    public class EventoController : ControllerBase
    {
        public readonly ProEventosContext _context;
        public readonly IEventoService _eventoService;
        private readonly ILogger<EventoController> _logger;
        private readonly IHostEnvironment _hostEnvironment;

        public EventoController(ProEventosContext context, IEventoService eventoService, ILogger<EventoController> logger, IHostEnvironment hostEnvironment)
        {
            _context = context;
            _eventoService = eventoService;
            _logger = logger;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var eventos = await  _eventoService.GetAllEventosAsync(); 
            if (eventos == null || !eventos.Any()) return NoContent();
            return Ok(eventos);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetId(int id)
        {
            var evento = await _eventoService.GetEventoByIdAsync(id);
            if (evento == null) return NoContent();
            return Ok(evento);
        }
        [HttpGet("{tema}")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            var eventos = await _eventoService.GetAllEventosByTemaAsync(tema);
            if (eventos == null || !eventos.Any()) return NoContent();
            return Ok(eventos);
        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] EventoDto evento)
        {
            if (evento == null) return BadRequest("Nenhum evento informado.");

            try
            {
                _logger.LogInformation("Criando novo evento: {@evento}", evento);
                var eventoRetorno = await _eventoService.AddEvento(evento);
                _logger.LogInformation("Evento criado com sucesso. ID: {id}", eventoRetorno.Id);
                return Ok(eventoRetorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao salvar evento");
                return BadRequest($"Erro ao salvar: {ex.Message}");
            }
        }

        [HttpPost("upload-image/{eventoId}")]
        public async Task<IActionResult> UploadImage(int eventoId)
        {
            try
            {
                var evento = await _eventoService.GetEventoByIdAsync(eventoId, true);
                if (evento == null) return NoContent();

                if (Request.Form.Files.Count == 0)
                    return BadRequest("Nenhum arquivo enviado.");

                var file = Request.Form.Files[0];
                if (file.Length == 0)
                    return BadRequest("Arquivo vazio.");

                if (file.Length > 5 * 1024 * 1024)
                    return BadRequest("Arquivo muito grande. Máx: 5MB.");

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var extension = Path.GetExtension(file.FileName).ToLower();

                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Formato inválido.");

                if (!string.IsNullOrEmpty(evento.ImagemUrl))
                {
                    DeleteImage(evento.ImagemUrl);
                }

                var imagemUrl = await SaveImage(file);

                evento.ImagemUrl = imagemUrl;

                var eventoRetorno = await _eventoService.UpdateEvento(eventoId, evento);

                return Ok(new { imagemUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao fazer upload: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EventoDto passarEvento)
        {
            if (passarEvento == null || id != passarEvento.Id)
                return BadRequest("Id do evento inválido.");

            var Evento = await _eventoService.GetEventoByIdAsync(id);
            if (Evento == null) return NoContent();

            await _eventoService.UpdateEvento(id, passarEvento);

            return Ok(passarEvento);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var Evento = await _eventoService.GetEventoByIdAsync(id);
            if (Evento == null) return NoContent();
            await _eventoService.DeleteEvento(Evento.Id);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [NonAction]
        public void DeleteImage(string imageUrl)
        {
            if (string.IsNullOrEmpty(imageUrl)) return;

            var fileName = Path.GetFileName(imageUrl);
            var path = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", "images", fileName);
            
            if (System.IO.File.Exists(path))
                System.IO.File.Delete(path);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            var extension = Path.GetExtension(imageFile.FileName).ToLower();
            var imageName = $"{Guid.NewGuid()}{extension}";

            var path = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot", "images");

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            var fullPath = Path.Combine(path, imageName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            return $"{baseUrl}/images/{imageName}";
        }
    }
}
