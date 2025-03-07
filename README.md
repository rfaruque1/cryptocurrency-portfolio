# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Running the project

Run npm install on the root directory to install packages. If you do get an error at this stage, you may need to upgrade your version of node. (Node version 16.0.0 should suffice).

# Using the project

When firing up the application for the first time, depending on the viewport size of the screen, you will see two panels - one panel to add/edit your crytocurrency and one to show historical performance data over the 30 day period.

When adding and selecting your cryptocoin, for the sake of simplicity, I have limited the currency type to USD and included the top 100 coins available for selection as well as being able to add the quantity. There is validation on this to ensure the correct values are input. An API call is then made to get the current price of that coin and subsequently your total is totaled up. Once your coin has been added to your portfolio, you can edit and view the historical performance of that coin and associated data.

The portfolio is data persistant on refresh and can be deleted if so wished. There is also filtering of coins available on coin name.
