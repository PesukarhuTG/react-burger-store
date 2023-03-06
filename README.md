# React Burger Store

<h2 align="center"><a href="https://rainbow-daifuku-771ba4.netlify.app/" target="_blank">Deploy link</a></h2>

![burger-preview](https://user-images.githubusercontent.com/39487464/223119936-792fa115-d0c0-4d83-b629-174ccadd7161.JPG)


### # Description

Burger Store is an application where you can order food.<br/>

Develompent:

- use [Vite](https://vitejs.dev/) to launch React project insread of CRA
- use [Classnames](https://www.npmjs.com/package/classnames) utility
- use Functional Components in React
- use [Redux (RTK)](https://redux-toolkit.js.org/) (store, slices...)
- implement a navigation menu, a products list, a cart
- user can add/remove good to/from the cart
- if we make an order, you will see a Delivering modal window with choosing of different ways of delivering and simple form validation<br/><br/>
![Снимок-delivery](https://user-images.githubusercontent.com/39487464/223123632-a08438e9-7f8c-4738-ae30-603981fe2b41.jpg)

### # Backend

In the development a [custom API](https://github.com/PesukarhuTG/api_your_meal) was used, launched locally

1. download [repo](https://github.com/PesukarhuTG/api_your_meal)
2. run the local server with command **< node index >**
3. use **API methods**<br/><br/>
`GET /api/product - goods list`<br/>
`GET /api/product?category={category} - get goods list by category`<br/>
`GET /api/product/category - get category list`<br/>
`GET /api/product/{id} - get good by ID`<br/>
`GET /api/product?list={id,id,id} - get goods list by list with IDs)`

...then the custom API was deployed [on Glitch](https://immediate-gainful-aluminum.glitch.me/) and now our deployed project works with deployed API.
