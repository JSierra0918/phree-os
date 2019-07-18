![phreeOS-highres](https://user-images.githubusercontent.com/46004362/61429932-1fc5f900-a8f6-11e9-8a94-e6820aa212da.png)

Phree-OS aims to provide an easy, inexpensive point of sales solution for little businesses that can't afford the big, expensive point of sales systems. Phree-OS is easy to use and manage, giving you more time to concentrate on the things that matter, like running your business!

## Team Members
1. Adam Ravitz
2. Esin Gokgoz
3. Jorge Sierra 

## Dependencies
Axios, bCrypt, Concurrently, Dot-env, Express, Express-Sessions, MySQL2, Passport.js, Query-String, React.js, React-Background-Slider, React-Charts-2, React-Dom, React-Router, Sequelize, and Stripe.

## Phree-OS
When you first come to our site, you're greeted with three options;
1. Login
2. Signup
3. About

![phreeosintro](https://user-images.githubusercontent.com/46004362/61429847-d70e4000-a8f5-11e9-87f7-e46049728291.gif)

After you've signed up, you're presented with this message, which instructs you to sign up for Stripe. From this link you may either sign in with your pre-existing Stripe account, or create a new one.  

<img width="776" alt="Screen Shot 2019-07-18 at 12 54 00 AM" src="https://user-images.githubusercontent.com/46004362/61430029-9236d900-a8f6-11e9-9508-83443e833b06.png">

We rely on Stripe to process all credit card transactions for our customers.  No matter what, they only charge %2.9 + $0.30 for each transaction, which we think is a pretty good deal.  In addition to being %100 PCI compliant, stripe also gives you full access to your own dash board, where you can track your sales, manage your money, and transfer funds to your bank account.

After your account Stripe account is set up its time to start setting up your store.

![set up store](https://user-images.githubusercontent.com/46004362/61430532-13db3680-a8f8-11e9-83df-457635956763.gif)

Its as easy as clicking on the manager tab in the top left corner, adding a category, then adding your items with the quantity you have in stock and the amount you'd like to sell it for. 

Add as many items as you'd like, then switch to the store page to start selling them! Selling items is just as easy adding them to our database.  You're given a representation of what your stock will be once this sale is complete, and a very clean and easy to read receipt with the quantity and total price for each item, and the grand total at the bottom.  

![selling!](https://user-images.githubusercontent.com/46004362/61430794-273ad180-a8f9-11e9-9a59-7d3f5dbed3ff.gif)

And lets say your customer didn't actually mean to buy 3 individual socks at $5.99 a piece... you can just hit that trash can to the right and the inventory will be replaced, and the total will reflect the change.

![Jul-18-2019 01-30-01](https://user-images.githubusercontent.com/46004362/61431492-a8936380-a8fb-11e9-9a48-58b8fa8fff3b.gif)
Completing a sale is just as easy as typing in your customers credit card number, and pressing send.  Stripe handles all the processing, so you know its secure, and you'll never need to worry about secure and private data falling into the wrong hands.

![checkout](https://user-images.githubusercontent.com/46004362/61431310-0a070280-a8fb-11e9-97d2-188a2eb0806f.gif)

Once your sale is completed you're brought back to the store page to do it all over again! Here you can see the inventory has changed, and if you click on your manager tab you'll beable to track your sales for the day with this handy visulaization thanks to `react-chart-2`
![salesreport2](https://user-images.githubusercontent.com/46004362/61431665-3c652f80-a8fc-11e9-9fb8-ed3b183c0399.gif)
