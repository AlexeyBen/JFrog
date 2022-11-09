import {MainPage} from "../pages/MainPage"
const mp = new MainPage();

describe('My solution to JFrog home assignment', () => {

    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl);
    })

    it('Should run website', () => {
        cy.get('body').should('be.visible')
    })

    it('Click on button "Add row"', () => {
        findLength({element: mp.rowsList()}).then(listLength => {
            cy.intercept('GET', 'http://localhost:3200/hello').as('getRoute');
            mp.addRow();
            cy.log("for some reason sometimes cypress yields status code of 304 though the 'fetch' is clearly 200, previously there was known bug about that")
            cy.wait('@getRoute').its('response.statusCode').should('equal' , 200)
            mp.rowsList().last().should("have.text", "Line item " + (listLength + 1))
        });
    })

    it('"Fill any text in input field Click on button "Add row"', function () {
        const text : string = "some text";
        mp.input().type(text)
        cy.intercept('GET', 'http://localhost:3200/hello').as('getRoute');
        mp.addRow();
        cy.wait('@getRoute')
        mp.rowsList().last().should("have.text", "Line item " + text);
        mp.input().invoke('attr' , 'value').should("include" , '')
    });


    it('"Check only odd rows checkboxes With interval 1s between checks." ', function () {
        findLength({element: mp.rowsList()}).then( length => {
            for (let i : number = 0 ; i < length ; i++){
                if(i % 2 == 0){
                    selectFromListOfElement({element: mp.rowsList() ,index: i + 1}).click().wait(1000)
                    cy.get('*[data-cy=\'checkbox-' + ( i + 2 ) + '\'] > svg').invoke('attr' , 'data-testid').should('include' , 'CheckBoxIcon')
                }
            }
        })
    });


    const selectFromListOfElement = ({element, index}) => {
           return element.eq(index);
    }

    const findLength = ({element}) => {
           return element.its('length');
    }

})


