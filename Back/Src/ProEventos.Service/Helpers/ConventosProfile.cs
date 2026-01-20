using AutoMapper;
using ProEventos.Domain.Models;
using ProEventos.Service.Dtos;

namespace ProEventos.Service.Helpers;

public class ConventosProfile : Profile
{
    public ConventosProfile()
    {
        CreateMap<Evento, EventoDto>().ReverseMap();
        CreateMap<Palestrante, PalestranteDto>().ReverseMap();
        CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
        CreateMap<Lote, LotesDto>().ReverseMap();
    }
}
