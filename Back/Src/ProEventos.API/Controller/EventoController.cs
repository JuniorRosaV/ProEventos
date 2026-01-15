using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain.Models;
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
        public EventoController(ProEventosContext context, IEventoService eventoService)
        {
            _context = context;
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var eventos = await  _eventoService.GetAllEventosAsync(); 
            if (eventos == null || !eventos.Any()) return NoContent();
            return Ok(eventos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetId(int id)
        {
            var evento = await _eventoService.GetEventoByIdAsync(id);
            if (evento == null) return NoContent();
            return Ok(evento);
        }
        [HttpGet("tema/{tema}")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            var eventos = await _eventoService.GetAllEventosByTemaAsync(tema);
            if (eventos == null || !eventos.Any()) return NoContent();
            return Ok(eventos);
        }

        [HttpPost("batch")]
        public async Task<IActionResult> Post([FromBody] EventoDto evento)
        {
            if (evento == null) return BadRequest("Nenhum evento informado.");

            await _eventoService.AddEvento(evento);
            await _context.SaveChangesAsync();

            return Ok(evento);
        }



        [HttpPut("{id}")]
        public async Task<ActionResult> Put( [FromBody] EventoDto passarEvento)
        {
            var Evento = await _eventoService.GetEventoByIdAsync(passarEvento.Id);
            if (Evento == null)
            {

                return NotFound();
            }
            await _eventoService.UpdateEvento(Evento.Id, passarEvento);
            await _context.SaveChangesAsync();

            return Ok(Evento);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var Evento = await _eventoService.GetEventoByIdAsync(id);
            if (Evento == null)
            {
                
                return NotFound();
            }
            await _eventoService.DeleteEvento(Evento.Id);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
