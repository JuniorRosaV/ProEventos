import { DateTimeFormatPipe } from './date-time-format-pipe';

describe('DateTimeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateTimeFormatPipe('pt-BR');
    expect(pipe).toBeTruthy();
  });
});
