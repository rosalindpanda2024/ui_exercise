$(document).ready(function(){

    // Initially hide all debit card form controls
    $('.debit-control').hide();

    // Show form controls based on radio button selection
    $('input[type="radio"]').change(function(){
        var selectedValue = $(this).val();
        if(selectedValue === 'checking') {
            $('.checking-control').show();
            $('.debit-control').hide();
        } else if(selectedValue === 'debitCard') {
            $('.debit-control').show();
            $('.checking-control').hide();
        }
    });

    $('.one-time-loan-payment-form').submit(function(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Reset validation messages
        $('.form-control').removeClass('is-invalid');
        $('.error-message').remove();
        
        // Flag for form validation
        var isValid = true;     
        
        //Account Number Validation    
        var accountNumber = $('.account-number').val().trim();
        if (accountNumber === '') {
            isValid = false;
            $('.account-number').addClass('is-invalid');
            $('.account-number').after('<div class="error-message">This field is required</div>');
        } else if(accountNumber !== '' && !$.isNumeric(accountNumber)) {
            isValid = false;
            $('.account-number').addClass('is-invalid');
            $('.account-number').after('<div class="error-message">Please enter a valid number</div>');
        }
    
        // Additional specific validations
        var accountType = $('input[name="accountType"]:checked').val();
        if (accountType === 'checking') {
            // Validate all required fields
            $('.checking-control .form-control').each(function() {
                if ($(this).val().trim() === '') {
                    isValid = false;
                    $(this).addClass('is-invalid');
                    $(this).after('<div class="error-message">This field is required</div>');
                }
            });
        
            // Validate numeric fields
            $('.checking-control .number-control').each(function() {
                var value = $(this).val().trim();
                if (value !== '' && !$.isNumeric(value)) {
                    isValid = false;
                    $(this).addClass('is-invalid');
                    $(this).after('<div class="error-message">Please enter a valid number</div>');
                }
            });
            var routingNumber = $('.routing-number').val().trim();
            if (routingNumber.length !== 9 || !$.isNumeric(routingNumber)) {
                isValid = false;
                if(!$('.routing-number').hasClass('is-invalid')) {
                    $('.routing-number').addClass('is-invalid');
                    $('.routing-number').after('<div class="error-message">Routing number must be 9 digits</div>');
                }                
            }

            // Validate bank account number confirmation
            var accountNumber = $('.bank-account-number').val().trim();
            var confirmAccountNumber = $('.confirm-bank-account-number').val().trim();
            if (accountNumber !== confirmAccountNumber) {
                isValid = false;
                $('.bank-account-number, .confirm-bank-account-number').addClass('is-invalid');
                $('.confirm-bank-account-number').after('<div class="error-message">Bank account numbers do not match</div>');
            }

        } else if (accountType === 'debitCard') {
            
            // Validate all required fields
            $('.debit-control .form-control').each(function() {
                if ($(this).val().trim() === '') {
                    isValid = false;
                    $(this).addClass('is-invalid');
                    $(this).after('<div class="error-message">This field is required</div>');
                }
            });
        
            // Validate numeric fields
            $('.debit-control .number-control').each(function() {
                var value = $(this).val().trim();
                if (value !== '' && !$.isNumeric(value)) {
                    isValid = false;
                    $(this).addClass('is-invalid');
                    $(this).after('<div class="error-message">Please enter a valid number</div>');
                }
            });

            var cvv = $('.cvv').val().trim();
            if (cvv.length !== 3 || !$.isNumeric(cvv)) {
                isValid = false;
                if(!$('.cvv').hasClass('is-invalid')) {
                    $('.cvv').addClass('is-invalid');
                    $('.cvv').after('<div class="error-message">CVV must be 3 digits</div>');
                }
            }
        }
    
        // If form is valid, submit it
        if (isValid) {
            // We can add your AJAX submission code here
            alert('Form submitted successfully!');
        }
    });
});
