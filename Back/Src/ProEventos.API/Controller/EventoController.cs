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
                    return BadRequest("Arquivo muito grande. Máximo 5MB.");

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var extension = Path.GetExtension(file.FileName).ToLower();
                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Tipo de arquivo não permitido. Apenas JPG, JPEG, PNG.");

                DeleteImage(evento.ImagemUrl);
                evento.ImagemUrl = await SaveImage(file);

                var eventoRetorno = await _eventoService.UpdateEvento(eventoId, evento);

                return Ok(eventoRetorno);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar fazer upload da imagem. Erro: {ex.Message}");
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
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            var extension = Path.GetExtension(imageFile.FileName).ToLower();
            string imageName = $"{Guid.NewGuid()}{extension}";

            var dir = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/images");
            Directory.CreateDirectory(dir);

            var imagePath = Path.Combine(dir, imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }
    }
}
