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

        public EventoController(ProEventosContext context, IEventoService eventoService, ILogger<EventoController> logger)
        {
            _context = context;
            _eventoService = eventoService;
            _logger = logger;
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
    }

}
