export class MainPage {
    addRowBtn() {
        return cy.get("*[data-cy='button']");
    };

    rowsList() {
        return cy.get('*[data-cy=\'list\'] >li');
    };

    input() {
        return cy.get('#outlined-basic');
    };

    addRow() {
        this.addRowBtn().click();
    }
}

