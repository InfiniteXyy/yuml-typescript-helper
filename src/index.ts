import { UsecaseDiagram } from "./usecase-helper"

const diagram = new UsecaseDiagram()
// Actors
const customor         = diagram.actor("Customor")
const staff            = diagram.actor("Office Staff")
// Use casesdiagram.
const signIn           = diagram.usecase("Sign In")
const buyProducts      = diagram.usecase("Buy Products")
const browseProducts   = diagram.usecase("Browse Products")
const checkout         = diagram.usecase("Checkout")
const addNewCreditCard = diagram.usecase("Add New Credit Card")
const processOrder     = diagram.usecase("Process Order")

customor.link(signIn)
customor.link(buyProducts)
buyProducts.include(browseProducts, checkout)
addNewCreditCard.extend(checkout)
staff.link(processOrder)


console.log(diagram.generate())
