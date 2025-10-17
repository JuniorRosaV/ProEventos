import { HoursFormatPipe } from './hours-format-pipe';

describe('HoursFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new HoursFormatPipe('pt-BR');
    expect(pipe).toBeTruthy();
  });
});
