import { CartItem, useAppContext } from "contexts/AppContext";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { getKlarnaUi } from "utils/api/order";

const klarnaHtml = (snippet) => {
   return `
       <html>
       <head> </head>
    
       <body>
       <textarea style="display: none" id="KCO">
                ${snippet}
        </textarea
          >
    
          <div id="my-checkout-container"></div>
    
          <!-- START - Dont edit -->
          <script type="text/javascript">
             var checkoutContainer = document.getElementById(
                "my-checkout-container"
             );
             checkoutContainer.innerHTML = document
                .getElementById("KCO")
                .value.replace(/\\"/g, '"')
                .replace(/\\n/g, "");
             var scriptsTags = checkoutContainer.getElementsByTagName("script");
             for (var i = 0; i < scriptsTags.length; i++) {
                var parentNode = scriptsTags[i].parentNode;
                var newScriptTag = document.createElement("script");
                newScriptTag.type = "text/javascript";
                newScriptTag.text = scriptsTags[i].text;
                parentNode.removeChild(scriptsTags[i]);
                parentNode.appendChild(newScriptTag);
             }
          </script>
          <!-- END -->
       </body>
    </html>
    
       `;
};


const KlarnaCheckout = () => {
   const { state } = useAppContext();
   const cartList: CartItem[] = state.cart;
 
   const getTotalPrice = () => {
     return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
   };
 
   const totalPrice = parseFloat(getTotalPrice().toFixed(2));
    const mutation = useMutation(
        getKlarnaUi,
    );

    useEffect(()=> {
        mutation.mutate({
            purchase_country: 'AT',
            purchase_currency: 'EUR',
            locale: typeof window !== 'undefined' ? localStorage.getItem('lang') : 'de',
            order_amount: getTotalPrice() * 100,
            order_lines: cartList.map(({name,qty,price}) => ({
               type: 'physical',
               name,
               quantity: qty,
               unit_price: price * 100,
               tax_rate: 0,
               total_amount: qty * price * 100,
               total_discount_amount: 0,
               total_tax_amount: 0,
            })),
        })
    },[])

    return <>  
      {mutation.isSuccess && <iframe
         height={'1000px'}
         width="100%"
         title='klarnaCheckout'
         className='iframe'
         srcDoc={klarnaHtml(mutation.data?.html_snippet)}
         frameBorder='0'
      ></iframe>
      } 
    </>
}

export default KlarnaCheckout