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

        public List<Evento> _eventos =  new List<Evento>
        {
            new Evento()
            {
                EventoId = 1,
                Local = "Garça - SP",
                DataEvento = "2025/10/22",
                Tema = "WorkShop de C#",
                QtdPessoas = 300,
                Lote = "1º lote",
                ImagemUrl = "Foto.png"
            },
            new Evento()
            {
                EventoId = 2, // lembre-se de mudar o ID
                Local = "Garça - SP",
                DataEvento = "2025/10/23",
                Tema = "WorkShop de Angular",
                QtdPessoas = 302,
                Lote = "2º lote",
                ImagemUrl = "Foto.png"
            }
        };

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _eventos;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetId(int id)
        {
            var evento = _eventos.FirstOrDefault(a => a.EventoId == id);
            return evento != null ? new List<Evento> { evento } : new List<Evento>();
        }


        [HttpPost]
        public List<Evento> Post([FromBody]Evento passarEvento)
        {
            _eventos.Add(passarEvento);
            return _eventos;
        }
        [HttpPut("{id}")]
        public ActionResult<Evento> Put(int id, [FromBody] Evento passarEvento)
        {
            var Evento = _eventos.FirstOrDefault(e => e.EventoId == id);
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
            var eventoParaDeletar = _eventos.FirstOrDefault(e => e.EventoId == id);

            if (eventoParaDeletar == null)
            {
                return NotFound();
            }

            _eventos.Remove(eventoParaDeletar);

            return NoContent();
        }
    }

}
