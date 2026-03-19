using Microsoft.AspNetCore.Mvc;
using ProEventos.Repository.Context;
using ProEventos.Service.Interfaces;
using ProEventos.Service.Dtos;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {
        private readonly ProEventosContext _context;
        private readonly ILotesService _lotesService;

        public LotesController(ProEventosContext context, ILotesService lotesService)
        {
            _context = context;
            _lotesService = lotesService;
        }

        [HttpGet("{eventoId:int}")]
        public async Task<IActionResult> GetLotesByEventoId(int eventoId)
        {
            var lotes = await _lotesService.GetLotesByEventoIdAsync(eventoId);

            if (lotes == null || !lotes.Any())
                return NoContent();

            return Ok(lotes);
        }

        [HttpPost("{eventoId:int}")]
        public async Task<IActionResult> PostLote(int eventoId, LotesDto[] models)
        {
            var lotes = await _lotesService.SaveLotes(eventoId, models);

            if (lotes == null)
                return BadRequest("Erro ao salvar lotes");

            return Ok(lotes);
        }

        [HttpDelete("{eventoId:int}/{loteId:int}")]
        public async Task<IActionResult> DeleteLote(int eventoId, int loteId)
        {
            var deleted = await _lotesService.DeleteLote(eventoId, loteId);

            if (!deleted)
                return BadRequest("Erro ao deletar lote");

            return Ok();
        }
    }
}