import { LottoPage } from './app.po';

describe('lotto App', () => {
  let page: LottoPage;

  beforeEach(() => {
    page = new LottoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
