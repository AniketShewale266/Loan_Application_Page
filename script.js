// getting all necessary elements for manipulation 
const loanForm = document.getElementById('loan-form');

// getting all input elements 
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const pan = document.getElementById("pan");
const loanAmount = document.getElementById("loan_amount");

// getting error messages elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const panError = document.getElementById("panError");
const loanAmountError = document.getElementById("loanAmountError");

// function for each input validation
const validationConfig = {
    fullName: [
        { required: true, message: "Please Enter Full Name" },
        { pattern: /^[A-Za-z]{4,}\s[A-Za-z]{4,}(\s[A-Za-z]{4,})*$/, message: "Please enter a valid full name with at least two words, each with a minimum of 4 characters." },
    ],
    email: [
        { required: true, message: "Please Enter an Email" },
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" }, 
    ],
    pan: [
        { required: true, message: "Please Enter PAN" },
        { pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/, message: "Please Enter Valid PAN" }
    ],
    loanAmount: [
        { required: true, message: "Please Enter Amount" },
        { pattern: /^\d{1,9}$/, message: "Enter a numeric loan amount up to 9 digits." },
    ],
};

// function for cheching validation
const validate = (formData) => {
    const errorData = {};
    Object.entries(formData).forEach(([key, value]) => {
        validationConfig[key].some((rule) => {
            if (rule.required && !value) {
                errorData[key] = rule.message;
                return true;
            }

            if (rule.pattern && !rule.pattern.test(value)) {
                errorData[key] = rule.message;
                return true;
            }
        });
    });

    return errorData;
};

// EMI Calculation
const calculateEMI = (loanAmount) => {
    const principal = parseFloat(loanAmount);
    const annualInterestRate = 8.5 / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const tenureMonths = 15 * 12;

    // formula for emi calculation
    const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

    return emi.toFixed(2);
};

loanAmount.addEventListener('input', () => {
    const amount = loanAmount.value;
    if (amount.match(/^\d{1,9}$/)) {
        const emi = calculateEMI(amount);
        emiDisplay.textContent = `₹${emi}`;
    } else {
        emiDisplay.textContent = "";
    }
});

fullName.addEventListener('input',()=>{
    nameError.textContent = "";
    
})

email.addEventListener('input',()=>{
    emailError.style.color = ''
})

pan.addEventListener('input',()=>{
    panError.style.color = ''
})

loanAmount.addEventListener('input',()=>{
    loanAmountError.style.color = ''
})


loanForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userData = {
        fullName: fullName.value,
        email: email.value,
        pan: pan.value,
        loanAmount: loanAmount.value
    }

    const result = validate(userData);

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    panError.textContent = "";
    loanAmountError.textContent = "";

    // console.log(result);
    
    if (Object.keys(result).length) {

        // corresponding error messages
        if (result.fullName) nameError.textContent = result.fullName;
        if (result.email) emailError.textContent = result.email;
        if (result.pan) panError.textContent = result.pan;
        if (result.loanAmount) loanAmountError.textContent = result.loanAmount;

        return;
    }

    // If validation is successful, redirect to confirm.html
    const queryParams = new URLSearchParams({
        name: fullName.value,
        email: email.value
    }).toString();

    window.location.href = `confirm.html?${queryParams}`;
});
