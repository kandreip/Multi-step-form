const tabElements = document.querySelectorAll('.side-bar-tab');
const activeTabs = document.querySelectorAll('.active-tab');
const goBackBtn = document.getElementById('go-back-btn');
const nextBtn = document.getElementById('next-btn')
const confirmBtn = document.getElementById('confirm-btn');
const steps = document.querySelectorAll('.step')
const firstPage = document.getElementById('firstStep')
const secondPage = document.getElementById('secondStep')
const thirdPage = document.getElementById('thirdStep')
const fourthPage = document.getElementById('fourthStep')
const lastPage = document.getElementById('lastStep')
const alertPlan = document.getElementById('plan-alert')
const checkboxAddOns = document.querySelectorAll('.checkbox-add-ons')
const footer = document.getElementById('footer')

var currentPageId = 1;

// Page display

function displayPage(id){
    steps.forEach(function(step){
        step.classList.add('hidden')
    })
    tabElements.forEach(function(tabElement){
        tabElement.classList.remove('active-tab')
    })

    document.getElementById(id).classList.add('active-tab')

    if (id == 1) {
        firstPage.classList.remove('hidden')
    } else if (id == 2) {
        secondPage.classList.remove('hidden')
    } else if (id == 3) {
        thirdPage.classList.remove('hidden')
    } else if (id == 4) {
        fourthPage.classList.remove('hidden')
        confirmBtn.classList.remove('hidden')
        nextBtn.classList.add('hidden')
        var resultsTotalPrice = 0;
        const resultsPlanPriceValue = document.getElementById('results-plan-price')
        var resultsItemsValue = document.querySelectorAll('.results-add-ons')
        var resultsTotalPriceDisplayed = document.getElementById('results-total-price')

        if (resultsItemsValue) {
            resultsItemsValue.forEach(function(item){
                resultsTotalPrice += parseInt(item.getAttribute('data-value'))
            })
    
        }
        resultsTotalPrice += parseInt(resultsPlanPriceValue.getAttribute('data-value'))
        resultsTotalPriceDisplayed.innerText = `+$${resultsTotalPrice}`
    }
}


// Hide go back button for the first step
activeTabs.forEach(function (activeTab) {
    if (activeTab.innerText == '1') {
        goBackBtn.classList.add('hidden');
    } else {
        goBackBtn.classList.remove('hidden');
    }
});

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}


function firstPageActions(){
    const inputsFirstStep = document.querySelectorAll('#firstStep input')
    const inputEmail = document.getElementById('helper-text-email')
    const inputEmailAlert = document.getElementById('helper-text-email-alert')
    const email = inputEmail.value

    inputsFirstStep.forEach(function(input){
        if (input.value !== '' ) {
            if (isValidEmail(email)) {
                inputEmailAlert.classList.add('hidden')
            } else {
                inputEmailAlert.classList.remove('hidden')
            }   
            input.parentElement.firstElementChild.classList.add('hidden')
            input.classList.remove('alert-input')
              
        } else {
            input.parentElement.firstElementChild.classList.remove('hidden')
            input.classList.add('alert-input')
            inputEmailAlert.classList.add('hidden')
        }
        
    })

    const alerts = document.querySelectorAll('.alert.hidden')
    const activePlans = document.querySelectorAll('.active-plan')
    
    
    
    if (alerts.length === 4) {
        const activeTabsCurrent = document.querySelectorAll('.active-tab');
        activeTabsCurrent.forEach(function (activeTab) {        
            if (currentPageId < 4) {
                if (currentPageId == 1) {
                    goBackBtn.classList.add('hidden');
                    currentPageId = parseInt(activeTab.getAttribute('id')) + 1;
                    displayPage(currentPageId)
                    goBackBtn.classList.remove('hidden');
                } else if (currentPageId == 2) {
                    goBackBtn.classList.remove('hidden');
                    if (activePlans.length !== 0) {
                        currentPageId = parseInt(activeTab.getAttribute('id')) + 1;
                        displayPage(currentPageId)
                        alertPlan.classList.add('hidden')
                    } else {
                        displayPage(currentPageId)
                        alertPlan.classList.remove('hidden')
                    }
                } else if (currentPageId == 3) {
                    goBackBtn.classList.remove('hidden');
                    currentPageId = parseInt(activeTab.getAttribute('id')) + 1;
                    displayPage(currentPageId)  
                } else if (currentPageId == 4) {
                    goBackBtn.classList.remove('hidden');
                    displayPage(currentPageId)  
                }
            }            
        });        
    }
}
  

// Go back button
goBackBtn.addEventListener('click', function(){
    const activeTabsCurrent = document.querySelectorAll('.active-tab');
    activeTabsCurrent.forEach(function (activeTab) {        
        if (currentPageId <=4) {
            currentPageId = parseInt(activeTab.getAttribute('id')) - 1;
            document.getElementById(currentPageId).click()
        }

        if (currentPageId == 1) {
            goBackBtn.classList.add('hidden');
        } else{
            goBackBtn.classList.remove('hidden');
        }

        displayPage(currentPageId)
    });

    confirmBtn.classList.add('hidden')
    nextBtn.classList.remove('hidden')
})


// Step 1

// Step 2
const toogleMonthly = document.getElementById('toogle-monthly')
const toogleYearly = document.getElementById('toogle-yearly')
const toogle = document.getElementById('checkbox-toogle')
const monthlyPrices = document.querySelectorAll('.price-monthly')
const yearlyPrices = document.querySelectorAll('.price-yearly')
const plans = document.querySelectorAll('.plan')
const resultsPlan = document.getElementById('results-plan')
const resultsPlanPrice = document.getElementById('results-plan-price')
const resultsPeriod = document.getElementById('results-period')
const resultsPeriodTotal = document.getElementById('results-period-total')
const resultsPeriodTotalPrice = document.getElementById('results-period-total-price')

function displayYearly(){
    toogleMonthly.classList.remove('active-toogle'); 
    toogleYearly.classList.add('active-toogle'); 
    monthlyPrices.forEach(function(monthlyPrice){
        monthlyPrice.classList.add('hidden')
    }) 
    yearlyPrices.forEach(function(yearlyPrice){
        yearlyPrice.classList.remove('hidden')
    }) 

    resultsPeriod.innerText = '(Yearly)'
    resultsPeriodTotal.innerText = 'Total (per year)'
    resultsPeriodTotalPrice.innerText = 'yr'
}

function displayMonthly(){
    toogleMonthly.classList.add('active-toogle'); 
    toogleYearly.classList.remove('active-toogle'); 
    monthlyPrices.forEach(function(monthlyPrice){
        monthlyPrice.classList.remove('hidden')
    }) 
    yearlyPrices.forEach(function(yearlyPrice){
        yearlyPrice.classList.add('hidden')
    }) 


    resultsPeriod.innerText = '(Monthly)'
    resultsPeriodTotal.innerText = 'Total (per month)'
    resultsPeriodTotalPrice.innerText = 'mo'
}

toogle.addEventListener('change', function(){
    plans.forEach(function (plan) {
        plan.classList.remove('active-plan');
    });
    if (toogle.checked) {
        displayYearly()
    } else {
        displayMonthly()
    }
   
    // Loop through all checkboxes
    checkboxAddOns.forEach(function (checkbox) {
        // Uncheck each checkbox
        if (checkbox.checked) {
            checkbox.click()
        }
    });
   

    

});

plans.forEach(function(plan){
    plan.addEventListener('click', function(){
        alertPlan.classList.add('hidden')
        const title = this.querySelector('h2');
        const priceMonthly = this.querySelector('p')
        const priceYearly = this.querySelector('span')

        if (title) {
            resultsPlan.innerText = title.innerText
        }
        if (priceMonthly.classList.contains('hidden') === false) {
            resultsPlanPrice.innerText = priceMonthly.innerText
            resultsPlanPrice.setAttribute('data-value', priceMonthly.getAttribute('data-value'))
        }
        if (priceYearly.classList.contains('hidden') === false) {
            resultsPlanPrice.innerText = priceYearly.innerText
            resultsPlanPrice.setAttribute('data-value', priceYearly.getAttribute('data-value'))
        }


        plans.forEach(function (plan) {
            plan.classList.remove('active-plan');
        });
        this.classList.add('active-plan');

        if (toogle.checked) {
            displayYearly()
        } else {
            displayMonthly()
        }
    })
})


// Next button
nextBtn.addEventListener('click', function(){
    firstPageActions()
})

// Step 3
const resultsAddOns = document.getElementById('results-add-ons')
const addOns = document.querySelectorAll('.item-add-ons')

addOns.forEach(function(addOn){
    addOn.addEventListener('click', function(){
        addOn.querySelector('input').click()
    })
})

checkboxAddOns.forEach(function(checkboxAddOn){
    checkboxAddOn.addEventListener('change', function(event){
        if (event.target.checked){
            event.target.parentElement.parentElement.parentElement.parentElement.classList.add('active-add-ons')
            const newLiElement = document.createElement('li');
            var addOnsTitle = event.target.nextElementSibling.firstElementChild.innerText;
            var addOnsPriceMonthly = event.target.parentElement.parentElement.nextElementSibling.firstElementChild.innerText;
            var addOnsValueMonthly = event.target.parentElement.parentElement.nextElementSibling.firstElementChild.getAttribute('data-value')
            var addOnsPriceYearly = event.target.parentElement.parentElement.nextElementSibling.lastElementChild.innerText;
            var addOnsValueYearly = event.target.parentElement.parentElement.nextElementSibling.lastElementChild.getAttribute('data-value')

            if (toogle.checked) {
                newLiElement.id = `${addOnsTitle}`;
                newLiElement.className = 'flex flex-row justify-between text-sm';
                newLiElement.innerHTML = `
                    <p class="text-gray-400">${addOnsTitle}</p>
                    <p data-value="${addOnsValueYearly}" class="text-blue-950 results-add-ons">${addOnsPriceYearly}</p>
                `;
            } else {
                newLiElement.id = `${addOnsTitle}`;
                newLiElement.className = ' flex flex-row justify-between text-sm';
                newLiElement.innerHTML = `
                    <p class="text-gray-400">${addOnsTitle}</p>
                    <p data-value="${addOnsValueMonthly}" class="text-blue-950 results-add-ons">${addOnsPriceMonthly}</p>
                `;
            }

            resultsAddOns.appendChild(newLiElement)

        } else{
            var searchTitle = event.target.nextElementSibling.firstElementChild.innerText;
            document.getElementById(searchTitle).remove();
            event.target.parentElement.parentElement.parentElement.parentElement.classList.remove('active-add-ons')
        }
    })
})


// Step 4

const changeButton = document.getElementById('change-btn')

changeButton.addEventListener('click', function(){
    currentPageId = 1;
    displayPage(1)
    firstPageActions()
    confirmBtn.classList.add('hidden')
    nextBtn.classList.remove('hidden')
})


confirmBtn.addEventListener('click', function(){
    footer.classList.add('hidden')
    steps.forEach(function(step){
        step.classList.add('hidden')
    })
    lastPage.classList.remove('hidden')
})










