import CustomerModel from "../models/customerModel.js";
import {customer_array} from "../db/database.js";

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validateMobile = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item, index) => {
        console.log(item);
        let data = `<tr><td>${item.name}</td><td>${item.email}</td><td>${item.phone}</td><td>${item.address}</td></tr>`
        $("#customerTableBody").append(data);
    })
}
// Clean Customer Form
const cleanCustomerForm  = () => {
    $('#customer-name').val("");
    $('#email').val("")
    $('#phone').val("");
    $('#address').val("");

}

// selected customer for update or delete
let selected_customer_index = null;


// add customer
$("#customer_add_btn").on('click', function (){
   let customer_name = $('#customer-name').val();
   let email = $('#email').val();
   let mobile = $('#phone').val();
   let address = $('#address').val();

    // console.log("customer_name: ",customer_name);
    // console.log("customer_email: ",email);
    // console.log("customer_mobile: ",mobile);
    // console.log("customer_address: ",address);
    if(customer_name.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Name",
        });
    } else if(!validateEmail(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Email",
        });
    } else if(!validateMobile(mobile)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Mobile",
        });
    } else if(address.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Address",
        });
    } else {
        let customer = new CustomerModel(
            customer_array.length + 1,
            customer_name,
            email,
            mobile,
            address
        );

        customer_array.push(customer);
        console.log(customer)
        // clean customer form
        cleanCustomerForm();
        loadCustomerTable();
    }


});

$('#customerTableBody').on('click', 'tr', function () {
    // get tr index
    let index = $(this).index();

    selected_customer_index = $(this).index();

    // get customer object by index
    let customer_obj = customer_array[index];

    // get customer's data
    let customerName = customer_obj.name;
    let email = customer_obj.email;
    let mobile = customer_obj.phone;
    let address = customer_obj.address;

    // fill data into the form
    $('#customer-name').val(customerName);
    $('#email').val(email);
    $('#phone').val(mobile);
    $('#address').val(address);
});

$('#customer_update_btn').on('click', function () {

    let index = selected_customer_index;

    let customer_name = $('#customer-name').val();
    let email = $('#email').val();
    let mobile = $('#phone').val();
    let address = $('#address').val();

    // let customer = {
    //     id: customer_array[index].id,
    //     first_name: first_name,
    //     last_name: last_name,
    //     mobile: mobile,
    //     email: email,
    //     address: address
    // };

    if(customer_name.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Name",
        });
    } else if(!validateEmail(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Email",
        });
    } else if(!validateMobile(mobile)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Mobile",
        });
    } else if(address.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Address",
        });
    } else {
        let customer = new CustomerModel(
            customer_array[index].id,
            customer_name,
            email,
            mobile,
            address
        );
        // update item
        customer_array[selected_customer_index] = customer;

        // clean customer form
        cleanCustomerForm();

        // reload the table
        loadCustomerTable();
    }

});

// customer delete

$("#customer_delete_btn").on('click', function () {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            // ==========================================================
            customer_array.splice(selected_customer_index, 1);

            // clean customer form
            cleanCustomerForm();

            // reload the table
            loadCustomerTable();
            // ==========================================================

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your customer has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

});
