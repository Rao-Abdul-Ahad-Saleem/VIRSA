import React from 'react'

// We are giving the single product through parameter
const RatingStar = ({ rating, rating_count, product_id }) => {
    // We have to set a variable like the one whose name is unqiue for every product means that is dynamic with respect to the product that eventually have the array of value and at the end the array of the value will set to empty for new upcomming product 


    let gradient;
    let value = [];

    let int_rate = Math.floor(rating);
    // let float_rate = rating - int_rate;
    let float_rate_decimal = ((rating - int_rate) * 100)
    let float_rate_percent = Math.round(float_rate_decimal)

    // rating loop
    for (let i = 0; i < 5; i++) {
        if (i < int_rate) {
            value.push(
                <stop offset="100%" stopColor="#F1C40F" />
            );
        }
        else if (i === int_rate && float_rate_percent > 0) {
            if (float_rate_percent <= 10) {
                value.push(
                    <stop offset="35%" stopColor="#F1C40F" />
                );

            } else if (float_rate_percent <= 20) {
                value.push(
                    <stop offset="40%" stopColor="#F1C40F" />
                );

            } else if (float_rate_percent <= 40) {
                value.push(
                    <stop offset="48%" stopColor="#F1C40F" />
                );

            } else if (float_rate_percent == 50) {
                value.push(
                    <stop offset="52%" stopColor="#F1C40F" />
                );

            } else if (float_rate_percent <= 70) {
                value.push(
                    <stop offset="63%" stopColor="#F1C40F" />
                );

            } else if (float_rate_percent <= 80) {
                value.push(
                    <stop offset="68%" stopColor="#F1C40F" />
                );

            } else {
                value.push(
                    <stop offset="72%" stopColor="#F1C40F" />
                );
            }
        } else {
            // Empty stars
            value.push(
                <stop offset="0%" stopColor="#F1C40F" />
            );
        }
    }


    gradient = value;

    // console.log(rating);
    // console.log(rating_count);
    // console.log(gradient);
    // console.log("-----------------");


    // a is treated as variable here
    value = [];







    // // 50% : 52 yellow , 5 - 5 empty 
    // // 60% - 70% : 63 yellow , 5-5 empty
    // // 80% : 68 yellow
    // // 90% : 72 yellow
    // // 10% : 37 yellow
    // // 20% -30% : 42 yellow
    // // 10% : 36 yellow
    // // 20% : 40 yellow
    // // 30% - 40% : 48 


    return (
        <div>

            <div className="flex items-center">
                {gradient.map((item, i) => (
                    <div key={i} className='p-px'>

                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 0 32 32">
                            <defs>
                                <linearGradient id={`grad-${i}-${product_id}`}>
                                    {item}
                                    <stop offset="5%" stopColor="white" />
                                    <stop offset="5%" stopColor="white" />
                                </linearGradient>
                            </defs>
                            <path fill={`url(#grad-${i}-${product_id})`} stroke="#F1C40F" strokeWidth="2" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
  l11.547-1.2L16.026,0.6L20.388,10.918z" />
                        </svg>

                    </div>
                ))}

                <p className='ps-3'>{`${rating} (${rating_count})`}</p>
            </div>



        </div>
    )
}

export default RatingStar
