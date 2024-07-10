

describe('Homepage', () => {

    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('should display introductory text and button', () => {
      cy.get('.intro-text').should('contain', 'Objevte s námi nové země');
      cy.get('button').contains('Prozkoumat').should('be.visible');
    });
  
    it('should navigate to the tips section on button click', () => {
      cy.get('button').contains('Prozkoumat').click();
      cy.get('#tips-section').should('be.visible');
    });
  
    it('should load more countries on scroll', () => {
      cy.scrollTo('bottom');
      cy.get('.cards-section').children().should('have.length.greaterThan', 8); 
    });
    
  
  
    });
  
    
  
    describe('Search Results Page', () => {
      beforeEach(() => {
        cy.visit('http://localhost:5173/search?q=fin');
      });
    
    
  
      it('should display search results', () => {
        cy.get('.cards-section').contains('Finland').should('be.visible'); 
      });
  
  
    });
  
    describe('Country Detail Page', () => {
      beforeEach(() => {
        cy.visit('http://localhost:5173/country/Finland');
      });
    
      it('should display country name and flag', () => {
        cy.get('.header').should('contain', 'Finland');
      });
    
      it('should display country details correctly', () => {
        cy.get('.loader-container').should('not.exist');
        
        cy.get('.header').should('contain', 'Finland');
        cy.get('.img').should('have.attr', 'src').should('include', 'flag');
    
        cy.get('.card-section-flex .card').eq(0).within(() => {
          cy.get('li').eq(0).should('contain', 'Republic of Finland (Suomen Tasavalta)');
          cy.get('li').eq(1).should('contain', 'Europe');
          cy.get('li').eq(2).should('contain', '5,544,322');
        });
    
        cy.get('.card-section-flex .card').eq(1).within(() => {
          cy.get('li').eq(0).should('contain', 'Helsinki');
          cy.get('li').eq(1).should('contain', '338,440 km²');
          cy.get('li').eq(2).should('contain', 'EUR');
        });
    
        cy.get('.card-continent').within(() => {
          cy.get('h1').should('contain', 'Další státy v tomto kontinentu');
          cy.get('.listContinents .continent').should('have.length.greaterThan', 0);
        });
      });
    
      it('should display other countries in the same continent', () => {
        cy.get('.listContinents').children().should('have.length', 7); 
      });
      
    
    });
    


    describe('Currency Filter Page', () => {
      beforeEach(() => {
        cy.visit('http://localhost:5173/currency-filter');
      });
    
      it('should display the currency filter dropdown', () => {
        cy.get('.currency-filter').should('contain', 'Vyberte měnu');
      });

      
    
      it('should filter countries by selected currency', () => {
        cy.get('.v-select').click();
        cy.get('.v-list-item').contains('CNY').click();
        cy.get('.cards-section').contains('China').should('be.visible'); 
      });
      

    });

    describe('Favourites filter page', () =>{
      beforeEach(() => {
        cy.visit('http://localhost:5173/favourites');
      });


      it('should display the header correctly', () => {
        cy.get('.header').contains('Oblíbené země');
      });



      it('should display no favorites message if there are no favorite countries', () => {
        cy.window().then(win => {
          win.$store = { favoriteCountries: [] };
        });
    
        cy.get('.loader-container').should('not.exist');
        
        cy.get('.no-favorites').should('contain', 'Dosud žádné uložené země 🥲');
      });

      it('should display favorite countries if they exist', () => {
        cy.fixture('favoriteCountries.json').then((favoriteCountries) => {
          localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountries));
        });


        cy.visit('http://localhost:5173/favourites');

        cy.get('.loader-container').should('not.exist');

        cy.get('.cards-wrapper .card-item').should('have.length', 2);
    
        cy.get('.cards-wrapper .card-item').eq(0).within(() => {
          cy.contains('Europe').should('exist');
          cy.contains('EUR').should('exist');
        });
    
        cy.get('.cards-wrapper .card-item').eq(1).within(() => {
          cy.contains('Europe').should('exist');
          cy.contains('NOK').should('exist');
        });
        

      });



    })
    
  