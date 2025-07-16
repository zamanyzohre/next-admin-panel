function getBlureDataUrl (){
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAA9AGEDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EAB0QAQEAAgMBAQEAAAAAAAAAAAABAgMREhNhUUH/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMABP/EABgRAQEBAQEAAAAAAAAAAAAAAAABAhES/9oADAMBAAIRAxEAPwD5PhuHT4DNE/D3i0sc3AzG/jrmmfhpp+Iap5pxzXR8q7ppNNKXtuvP8aHjk9Lx+N4/DTQdeb55QOtn8ejdPwmWlbOg9OEXRlq+J3UpKb1E2P51hHseh5jNa/UZinXNKjNZprVmJpi59qROazzWpMTyIWmS82815i3U8oVy3WnlrdlxSyxWzS1xZYJXB2ZYpXFaF65+jL9WMHXXw3AsShGGF5blHUUikNKl2GZueqLSjyjMx7jkKekybsFq+SVPKEuKtLwtE6n1ZThjMIciFCjAtLaNJUtQ8G5B3JaTlzbikWmZ5m5+TSjhq6JkPKUp46cp07cNBUhA4YzMz//Z"
}getBlureDataUrl

const FormatNumber =(number)=>{
return new Intl.NumberFormat().format(number)
}

const salePercent = (price,sale_price)=>{
return Math.round(((price - sale_price) / price) * 100)
}

const handleErrors = (message) => {
    if (typeof message === 'object') {
        const errors = [];
        Object.keys(message).map(key => {
            message[key].map(e => {
                errors.push(e)
            })
        })

        return errors.join();
    }

    return message;
}

 function sum(store){
       return (store.cart.reduce((total,product)=>{
            return product.is_sale? total + (product.sale_price*product.qty) : total + (product.price*product.qty)
        },0)
       
    )}

export {getBlureDataUrl,FormatNumber,handleErrors,salePercent,sum}