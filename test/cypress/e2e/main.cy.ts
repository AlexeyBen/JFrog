describe('Main test', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Should run website', () => {
    cy.get('body').should('be.visible')
  })
})