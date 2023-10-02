## Node.js APIs which includes functionalites
   - [x] Sign up for User through unique mobile number 
   - [ ] Role base login  
      - Admin (full access, Please add admin static entry direct into database )
      - User (Self write) --Done
   - [ ] User can order the product after login
   - [ ] Admin can upload Multiple images of Product (validation(size, type ) for product [.jpg | .png])
   - [x] Login (JWT token)--Done
   - [x] CRUD Product [Name, Size, Image, Colour, Price, Quantity].--Done
   - [ ] CRUD Order User wise [user_id, order_code, order_date, required_date, shipped_date, order_status ]
   - [x] Sorting, pagination, search by Name of Product (In the first page should be 10 records after that 12 records each)
   - [ ] Admin can manage all products and orders of user.


# Folder

```
practicalround/
├── config/
│   └── database.js
├── controllers/
│   ├── adminController.js
│   ├── userController.js
│   └── productController.js
├── middleware/
│   └── adminAuth.js   
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── userRoutes.js
│   ├── adminRoutes.js
│   └── productRoutes.js       
├── constant.js 
└── index.js  
```

# APIs
* POST: localhost:3000/api/user/login
* POST: localhost:3000/api/user/signup
* POST: localhost:3000/api/product
* PATCH: localhost:3000/api/product/1
   

