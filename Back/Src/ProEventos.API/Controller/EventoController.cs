using Back.Src.ProEventos.API.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ProEventos.API.Controllers
{

    [ApiController] // Marca como API controller
    [Route("api/[controller]")] // Rota padrão: /api/nome-do-controller
    
    public class EventoController : ControllerBase
    {
        public readonly DataContext _context;
        public EventoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _context.Eventos;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetId(int id)
        {
            var evento = _context.Eventos.FirstOrDefault(a => a.EventoId == id);
            return evento != null ? new List<Evento> { evento } : new List<Evento>();
        }


        [HttpPost("batch")]
        public IActionResult Post([FromBody] List<Evento> eventos)
        {
            if (eventos == null || !eventos.Any())
                return BadRequest("Nenhum evento informado.");

            _context.Eventos.AddRange(eventos);
            _context.SaveChanges();

            return NoContent();
        }



        [HttpPut("{id}")]
        public ActionResult<Evento> Put(int id, [FromBody] Evento passarEvento)
        {
            var Evento = _context.Eventos.FirstOrDefault(e => e.EventoId == id);
            if (Evento == null)
            {
                return NotFound();
            }
            Evento.Local = passarEvento.Local;
            Evento.DataEvento = passarEvento.DataEvento;
            Evento.Tema = passarEvento.Tema;
            Evento.QtdPessoas = passarEvento.QtdPessoas;
            Evento.Lote = passarEvento.Lote;
            Evento.ImagemUrl = passarEvento.ImagemUrl;

            return Ok(Evento);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var eventoParaDeletar = _context.Eventos.FirstOrDefault(e => e.EventoId == id);

            if (eventoParaDeletar == null)
            {
                return NotFound();
            }

            _context.Eventos.Remove(eventoParaDeletar);

            return NoContent();
        }
    }

}
