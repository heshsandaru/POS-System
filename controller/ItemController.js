import ItemModel from "../models/itemModel.js";
import {customer_array, item_array} from "../db/database.js";


const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_array.map((item, index) => {
        console.log(item);
        let data = `<tr><td>${item.name}</td><td>${item.description}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`
        $("#itemTableBody").append(data);
    })
}

const cleanItemForm  = () => {
    $('#name').val("");
    $('#description').val("")
    $('#quantity').val("");
    $('#price').val("");
}

// selected item for update or delete
let selected_item_index = null;

// add item
$("#item_add_btn").on('click', function (){
    let item_name = $('#name').val();
    let description = $('#description').val();
    let quantity = $('#quantity').val();
    let price = $('#price').val();


    if(item_name.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Name",
        });
    } else if(description.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid description",
        });
    } else if(quantity.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid quantity",
        });
    } else if(price.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid price",
        });
    } else {
        let item = new ItemModel(
            item_array.length + 1,
            item_name,
            description,
            quantity,
            price
        );

        item_array.push(item);
        console.log(item)
        // clean item form
        cleanItemForm();
        loadItemTable();
    }


});

$('#itemTableBody').on('click', 'tr', function () {
    // get tr index
    let index = $(this).index();

    selected_item_index = $(this).index();

    // get item object by index
    let item_obj = item_array[index];

    // get item's data
    let itemName = item_obj.name;
    let description = item_obj.description;
    let quantity = item_obj.quantity;
    let price = item_obj.price;

    // fill data into the form
    $('#name').val(itemName);
    $('#description').val(description);
    $('#quantity').val(quantity);
    $('#price').val(price);
});

$('#item_update_btn').on('click', function () {

    let index = selected_item_index;

    let item_name = $('#name').val();
    let description = $('#description').val();
    let quantity = $('#quantity').val();
    let price = $('#price').val();



    if(item_name.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Name",
        });
    } else if(description.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Description",
        });
    } else if(quantity.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Description",
        });
    } else if(price.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Price",
        });
    } else {
        let item = new ItemModel(
            item_array[index].id,
            item_name,
            description,
            quantity,
            price
        );
        // update item
        item_array[selected_item_index] = item;

        // clean item form
        cleanItemForm();

        // reload the table
        loadItemTable();
    }

});

// item delete

$("#item_delete_btn").on('click', function () {

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
            item_array.splice(selected_item_index, 1);

            // clean customer form
            cleanItemForm();

            // reload the table
            loadItemTable();
            // ==========================================================

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
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
