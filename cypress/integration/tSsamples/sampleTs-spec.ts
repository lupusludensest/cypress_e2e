describe("Reg form", () => {
    it("Enter some value", () => {
        cy.visit("https://qavbox.github.io/demo/signup/");
        // cy.get("#username").type("qavbox");
        cy.get('input.EnterText').type("QAVBOX");
        cy.get('input[name="home"]').click();

        cy.visit("https://qavbox.github.io/demo/signup/");
        cy.get('#mygroup > li').should('have.length', 0); // 4
        cy.get('#mygroup li').should('have.length', 0); // 5
        cy.get("ul[id='mygroup']").should('have.length', 0) // 1
        cy.get("#mygroup ~ p").should('have.length', 0) // 4
    })
})