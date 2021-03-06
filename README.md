[![phreeOS-highres](https://user-images.githubusercontent.com/46004362/61429932-1fc5f900-a8f6-11e9-8a94-e6820aa212da.png)](https://phree-os.herokuapp.com/)
Phree-OS aims to provide an easy, inexpensive point of sales solution for little businesses that can't afford the big, expensive point of sales systems. Phree-OS is easy to use and manage, giving you more time to concentrate on the things that matter, like running your business!  Our goal is to give small businesses owners e.g., flea market vendors, people running estate and garage sales, and farmer market vendors, the ability to manage their inventory and securly make credit card sales from their computer or mobile device.

## Team Members
1. Adam Ravitz
2. Esin Gokgoz
3. Jorge Sierra 

## Dependencies
Axios, bCrypt, Concurrently, Dot-env, Express, Express-Sessions, MySQL2, Node. Js, Passport.js, Query-String, React.js, React-Background-Slider, React-Charts-2, React-Dom, React-Router, Sequelize, and Stripe.

## Phree-OS
When you first come to our site, you're greeted with three options;

![phreeosintro](https://user-images.githubusercontent.com/46004362/61429847-d70e4000-a8f5-11e9-87f7-e46049728291.gif)

After you've signed up, you're presented with this message, which instructs you to sign up for Stripe. From this link you may either sign in with your pre-existing Stripe account, or create a new one.  

<img width="776" alt="Screen Shot 2019-07-18 at 12 54 00 AM" src="https://user-images.githubusercontent.com/46004362/61430029-9236d900-a8f6-11e9-9508-83443e833b06.png">

We rely on Stripe to process all credit card transactions for our customers.  No matter what, they only charge 2.9% + $0.30 for each transaction, which we think is a pretty good deal.  In addition to being 100% PCI compliant, stripe also gives you full access to a personal dash board where you can track your sales, manage your money, and transfer funds to your bank account. Once your account with Stripe is setup, you're redirected back to our site where we store your account number in our database, then bring you to the main page so you can start setting up your store!   

### Setting up your store
![set up store](https://user-images.githubusercontent.com/46004362/61430532-13db3680-a8f8-11e9-83df-457635956763.gif)

Its as easy as clicking on the manager tab in the top left corner, adding a category, then adding your items with the quantity you have to sell, and the amount you'd like to sell it for. 


### Making a sale
Add as many items as you'd like, then switch to the store page to start making sales! Selling items is just as easy adding them to our database.  On the right you have your categories and items, just as they were in on the manager page, and on the left is your payment summary. The payment summary is a clean, and easy to read receipt with the quantity and total price for each item, and the grand total at the bottom. 

![selling2](https://user-images.githubusercontent.com/46004362/61431721-7b938080-a8fc-11e9-96de-6aac369888f4.gif)

And lets say your customer didn't actually mean to buy 3 individual socks at $5.99 a piece... you can just hit that trash can to the right and the inventory will be replaced, and the total will reflect the change.

![Jul-18-2019 01-30-01](https://user-images.githubusercontent.com/46004362/61431492-a8936380-a8fb-11e9-9a48-58b8fa8fff3b.gif)

### Completing a sale 
Completing a sale is just as easy as typing in your customers credit card number, and pressing send.  Stripe handles all the processing, so you know its safe, and you'll never need to worry about secure and private data falling into the wrong hands.

![checkout](https://user-images.githubusercontent.com/46004362/61431310-0a070280-a8fb-11e9-97d2-188a2eb0806f.gif)

Once your sale is completed you're brought back to the store page to do it all over again! Here you can see the inventory has changed, and if you click on your manager tab you'll beable to track your sales for the day with this handy visulaization thanks to `react-chart-2`

![salesreport2](https://user-images.githubusercontent.com/46004362/61431665-3c652f80-a8fc-11e9-9fb8-ed3b183c0399.gif)
 - - -
 Check us out: [Phree-OS](https://phree-os.herokuapp.com/)
