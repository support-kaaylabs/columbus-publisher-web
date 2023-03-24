import React, { type FC } from 'react';
import imageOne from './Images/shoes.png';
import classes from './Details.module.scss';
import Arrow from './Images/leftArrow.png';
import Eye from './Images/eye1.png';
import Hand from './Images/hand.png';
import Arrow1 from './Images/arrow.png';
import Plus from './Images/plus.svg';

const ProductDetail: FC = () => {

   
    return(
        <div className={classes.head}>
            <div className={classes.arrow}>
                <img src={Arrow} alt='Left Arrow' />
            </div>
            <div className={classes.content}>
                <div className={classes.leftContent}>
                    <div className={classes.largeImage}>
                        <div>
                        <img src={imageOne} alt='Shoe' />
                        </div>
                        <div className={classes.largeImageContent}>
                            <div className={classes.smallImage1}>                
                            </div>
                            <div className={classes.smallImage2}>                    
                            </div>
                            <div className={classes.smallImage3}>                    
                            </div>     
                        </div>             
                    </div>
                    <div className={classes.impression}>
                        <p>Impression</p>
                        <div className={classes.buttonDiv}>
                        <button type='button'><span><img src={Eye} alt='Eye' /><p>40,00000</p></span></button>
                        </div>
                    </div>
                    <div className={classes.clicks}>
                        <p>Clicks</p>
                        <div className={classes.buttonDiv}>
                        <button type='button'><span><img src={Hand} alt='Eye' /><p>400</p></span></button>
                        </div>
                    </div>
                    <div className={classes.cta}>
                        <p>CTA</p>
                        <div className={classes.buttonDiv}>
                        <button type='button'><span><img src={Arrow1} alt='Arrow' /><p>40</p></span></button>
                        </div>
                    </div> 
                </div>  
                <div className={classes.rightContent}>
                    <p className={classes.para1}>United Colors of Benetton</p>
                    <p className={classes.para2}>KNITTED LACE UP LIFESTYLE SNEAKER..</p>
                    <div className={classes.rating}>
                        <span className={classes.rating1}>₹3,824</span>
                        <span className={classes.rating2}>₹4,499</span>
                        <span className={classes.rating3}>15% Off</span>
                    </div>
                    <div className={classes.productDetailBox}>                    
                        <div className={classes.head}>
                            <span className={classes.product}>PRODUCT DETAILS</span>
                            <span className={classes.decrease}></span>                      
                        </div>
                        <div className={classes.headBorder} />

                        <div className={classes.detail1}>
                            <p className={classes.para1}>- Lorem Ipsum is simply dummy text of the printing 
                            and typesetting industry. Lorem Ipsum has been the 
                            industry's standard dummy text ever since the 1500s, 
                            </p>
                            <p className={classes.para2}>
                            when an unknown printer took a galley of type and 
                            scrambled it to make a type specimen book. It has 
                            survived not only five centuries, but also the leap 
                            into electronic typesetting, remaining essentially 
                            unchanged. It was popularised in the 1960s with the 
                            release of Letraset sheets containing
                            </p>
                            <p className={classes.para3}> Lorem Ipsum 
                            passages, and more recently with desktop publishing 
                            software
                            </p>
                        </div>
                    </div>
                    <div className={classes.detail2}>
                        <span className={classes.product}>MORE DETAILS</span>
                        <span className={classes.decrease}><img src={Plus} alt='Plus symbol' /></span> 
                    </div>               
                </div> 
            </div> 
        </div>
    );
};

export default ProductDetail;
