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
        CreateMap<Lote, LotesDto>()
            .ForMember(dest => dest.DataInicio, opt => opt.MapFrom(src => src.DataInicio.ToString("yyyy-MM-ddTHH:mm")))
            .ForMember(dest => dest.DataFim, opt => opt.MapFrom(src => src.DataFim.ToString("yyyy-MM-ddTHH:mm")))
            .ReverseMap()
            .ForMember(dest => dest.DataInicio, opt => opt.MapFrom(src => DateTime.Parse(src.DataInicio)))
            .ForMember(dest => dest.DataFim, opt => opt.MapFrom(src => DateTime.Parse(src.DataFim)));
    }
}
