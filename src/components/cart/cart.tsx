import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../header/header';
import { generatePath } from 'react-router-dom';
import { getCardsCart, getCoupon } from '../../store/cards-data/selectors';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../cart-item/cart-item';
import { postCoupon } from '../../store/api-actions';
import { setPromo } from '../../store/action';

function Cart(): JSX.Element {
  const cardsCart = useSelector(getCardsCart);
  const discount = useSelector(getCoupon);
  const [coupon, setCoupon] = useState({'coupon': ''});
  const [couponIsOk, setCouponIsOk] = useState(false);
  const [couponNotOk, setCouponNotOk] = useState(false);
  const [couponValid, setCouponValid] = useState(true);
  const dispatchAction = useDispatch();

  const prise:number[] = [];
  cardsCart.filter((card) => prise.push(card.count === undefined? card.price: card.price*card.count));
  let sum=0;
  for (let i=0; i<prise.length; i++){
    sum=sum+prise[i];
  }

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon({'coupon': event.target.value});
  };

  const getValidForCoupon = () => {
    if (coupon.coupon.indexOf(' ') !== -1) {
      setCouponValid(false);
    } else {
      setCouponValid(true);
    }
  };

  useEffect(() => {
    if (coupon.coupon.length > 0) {
      getValidForCoupon();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupon]);

  return (
    <React.Fragment>
      <div className="visually-hidden" data-testid="cart-test">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <symbol id="icon-arrow-up" viewBox="0 0 9 16">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.307488 5.31736C0.249284 5.2593 0.203105 5.19033 0.171597 5.1144C0.140089 5.03847 0.123871 4.95707 0.123871 4.87486C0.123871 4.79265 0.140089 4.71125 0.171597 4.63532C0.203105 4.55939 0.249284 4.49042 0.307488 4.43236L4.05749 0.682359C4.11555 0.624155 4.18452 0.577977 4.26045 0.546469C4.33638 0.514961 4.41778 0.498742 4.49999 0.498742C4.5822 0.498742 4.6636 0.514961 4.73953 0.546469C4.81546 0.577977 4.88443 0.624155 4.94249 0.682359L8.69249 4.43236C8.80985 4.54972 8.87578 4.70889 8.87578 4.87486C8.87578 5.04083 8.80985 5.2 8.69249 5.31736C8.57513 5.43472 8.41596 5.50065 8.24999 5.50065C8.08402 5.50065 7.92485 5.43472 7.80749 5.31736L4.49999 2.00861L1.19249 5.31736C1.13443 5.37556 1.06546 5.42174 0.98953 5.45325C0.913599 5.48476 0.832197 5.50098 0.749988 5.50098C0.667779 5.50098 0.586377 5.48476 0.510446 5.45325C0.434514 5.42174 0.365545 5.37556 0.307488 5.31736Z" fill="currentcolor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M4.5 15.5C4.33424 15.5 4.17527 15.4342 4.05806 15.3169C3.94085 15.1997 3.875 15.0408 3.875 14.875L3.875 1.75C3.875 1.58424 3.94085 1.42527 4.05806 1.30806C4.17527 1.19085 4.33424 1.125 4.5 1.125C4.66576 1.125 4.82473 1.19085 4.94194 1.30806C5.05915 1.42527 5.125 1.58424 5.125 1.75L5.125 14.875C5.125 15.0408 5.05915 15.1997 4.94194 15.3169C4.82473 15.4342 4.66576 15.5 4.5 15.5Z" fill="currentcolor" />
          </symbol>
          <symbol id="icon-basket" viewBox="0 0 14 14">
            <path d="M13.8657 4.67725C13.8151 4.6074 13.7524 4.55132 13.6818 4.51287C13.6113 4.47442 13.5345 4.45451 13.4568 4.45452H10.2286V1.90908C10.2286 1.40276 10.0585 0.917179 9.75585 0.559157C9.45315 0.201135 9.0426 0 8.61452 0H5.38636C4.95828 0 4.54773 0.201135 4.24503 0.559157C3.94233 0.917179 3.77228 1.40276 3.77228 1.90908V4.45452H0.544119C0.46613 4.45347 0.388881 4.4725 0.317725 4.51027C0.246569 4.54804 0.183207 4.60366 0.132029 4.67327C0.0808507 4.74288 0.0430804 4.82482 0.0213348 4.91341C-0.000410723 5.00201 -0.00561161 5.09513 0.00609251 5.18633L1.01758 12.9181C1.05649 13.2216 1.18683 13.4982 1.38457 13.697C1.58231 13.8958 1.83413 14.0034 2.09364 13.9999H11.918C12.1775 14.0034 12.4293 13.8958 12.6271 13.697C12.8248 13.4982 12.9551 13.2216 12.9941 12.9181L13.9948 5.18633C14.0056 5.09548 13.9996 5.00295 13.9773 4.91508C13.955 4.82721 13.9169 4.74608 13.8657 4.67725ZM4.84833 1.90908C4.84833 1.74031 4.90502 1.57845 5.00592 1.45911C5.10682 1.33976 5.24366 1.27272 5.38636 1.27272H8.61452C8.75721 1.27272 8.89406 1.33976 8.99496 1.45911C9.09586 1.57845 9.15254 1.74031 9.15254 1.90908V4.45452H4.84833V1.90908ZM11.918 12.7272H2.08288L1.17361 5.72724H12.8273L11.918 12.7272Z" fill="currentcolor" />
          </symbol>
          <symbol id="icon-clock" viewBox="0 0 10 10">
            <path d="M5 0.625C2.58398 0.625 0.625 2.58398 0.625 5C0.625 7.41602 2.58398 9.375 5 9.375C7.41602 9.375 9.375 7.41602 9.375 5C9.375 2.58398 7.41602 0.625 5 0.625ZM6.72363 6.34473L6.44434 6.72559C6.43826 6.73388 6.43061 6.74089 6.42181 6.74622C6.41302 6.75154 6.40326 6.75508 6.3931 6.75662C6.38294 6.75816 6.37257 6.75768 6.36259 6.75521C6.35261 6.75273 6.34322 6.7483 6.33496 6.74219L4.71973 5.56445C4.70966 5.55723 4.70148 5.54769 4.69588 5.53664C4.69027 5.5256 4.6874 5.51336 4.6875 5.50098V2.8125C4.6875 2.76953 4.72266 2.73438 4.76562 2.73438H5.23535C5.27832 2.73438 5.31348 2.76953 5.31348 2.8125V5.22949L6.70605 6.23633C6.74121 6.26074 6.74902 6.30957 6.72363 6.34473Z" fill="white" />
          </symbol>
          <symbol id="icon-close" viewBox="0 0 14 14">
            <path d="M12.3001 13.4833L7.00006 8.175L1.70006 13.4833L0.516724 12.3L5.82506 7L0.516724 1.7L1.70006 0.516663L7.00006 5.825L12.3001 0.524996L13.4751 1.7L8.17506 7L13.4751 12.3L12.3001 13.4833Z" fill="#000000" />
          </symbol>
          <symbol id="icon-facebook" viewBox="0 0 24 24">
            <path xmlns="http://www.w3.org/2000/svg" fill="currentcolor" d="M12 0C5.37294 0 0 5.40537 0 12.0724C0 18.0972 4.38764 23.0909 10.1254 24V15.5629H7.07711V12.0724H10.1254V9.41262C10.1254 6.38455 11.9172 4.71476 14.6571 4.71476C15.97 4.71476 17.3453 4.9502 17.3453 4.9502V7.91911H15.8284C14.3402 7.91911 13.8746 8.85119 13.8746 9.80622V12.07H17.2001L16.6685 15.5605H13.8746V23.9976C19.6124 23.0933 24 18.0984 24 12.0724C24 5.40537 18.6271 0 12 0Z" />
          </symbol>
          <symbol id="icon-full-star" viewBox="0 0 14 12">
            <path d="M12.0902 4.13787L8.97645 3.70544L7.58451 1.00895C7.54649 0.935124 7.48394 0.875359 7.40668 0.83903C7.21291 0.747624 6.97745 0.823796 6.88056 1.00895L5.48862 3.70544L2.37484 4.13787C2.289 4.14959 2.21051 4.18826 2.15041 4.24685C2.07777 4.3182 2.03773 4.4142 2.03911 4.51374C2.04049 4.61328 2.08317 4.70822 2.15777 4.77771L4.41063 6.87654L3.87838 9.84022C3.8659 9.90917 3.87389 9.98007 3.90143 10.0449C3.92897 10.1097 3.97498 10.1659 4.03422 10.207C4.09346 10.2481 4.16358 10.2725 4.23661 10.2775C4.30964 10.2825 4.38268 10.2678 4.44743 10.2351L7.23254 8.83593L10.0176 10.2351C10.0937 10.2738 10.182 10.2867 10.2666 10.2726C10.48 10.2375 10.6235 10.0441 10.5867 9.84022L10.0544 6.87654L12.3073 4.77771C12.3686 4.72029 12.4091 4.64529 12.4214 4.56326C12.4545 4.35818 12.3048 4.16834 12.0902 4.13787Z" fill="#C90606" />
          </symbol>
          <symbol id="icon-instagram" viewBox="0 0 24 24">
            <path xmlns="http://www.w3.org/2000/svg" fill="currentcolor" d="M12 24C10.375 24 8.82031 23.6836 7.33594 23.0508C5.85156 22.418 4.57422 21.5664 3.50391 20.4961C2.43359 19.4258 1.58203 18.1484 0.949219 16.6641C0.316406 15.1797 0 13.625 0 12C0 10.375 0.316406 8.82031 0.949219 7.33594C1.58203 5.85156 2.43359 4.57422 3.50391 3.50391C4.57422 2.43359 5.85156 1.58203 7.33594 0.949219C8.82031 0.316406 10.375 0 12 0C13.625 0 15.1797 0.316406 16.6641 0.949219C18.1484 1.58203 19.4258 2.43359 20.4961 3.50391C21.5664 4.57422 22.418 5.85156 23.0508 7.33594C23.6836 8.82031 24 10.375 24 12C24 13.625 23.6836 15.1797 23.0508 16.6641C22.418 18.1484 21.5664 19.4258 20.4961 20.4961C19.4258 21.5664 18.1484 22.418 16.6641 23.0508C15.1797 23.6836 13.625 24 12 24ZM18 7.5C18 7.09375 17.8555 6.74219 17.5664 6.44531C17.2773 6.14844 16.9219 6 16.5 6H7.5C7.09375 6 6.74219 6.14844 6.44531 6.44531C6.14844 6.74219 6 7.09375 6 7.5V9H8.67188C9.57812 8 10.6875 7.5 12 7.5C13.3125 7.5 14.4219 8 15.3281 9H18V7.5ZM9 12C9 12.8281 9.29297 13.5352 9.87891 14.1211C10.4648 14.707 11.1719 15 12 15C12.8281 15 13.5352 14.707 14.1211 14.1211C14.707 13.5352 15 12.8281 15 12C15 11.1719 14.707 10.4648 14.1211 9.87891C13.5352 9.29297 12.8281 9 12 9C11.1719 9 10.4648 9.29297 9.87891 9.87891C9.29297 10.4648 9 11.1719 9 12ZM18 10.5H16.2188C16.4062 11.0156 16.5 11.5156 16.5 12C16.5 13.25 16.0625 14.3125 15.1875 15.1875C14.3125 16.0625 13.25 16.5 12 16.5C10.75 16.5 9.6875 16.0625 8.8125 15.1875C7.9375 14.3125 7.5 13.25 7.5 12C7.5 11.5156 7.59375 11.0156 7.78125 10.5H6V16.5C6 16.9219 6.14453 17.2773 6.43359 17.5664C6.72266 17.8555 7.07812 18 7.5 18H16.5C16.9219 18 17.2773 17.8555 17.5664 17.5664C17.8555 17.2773 18 16.9219 18 16.5V10.5Z" />
          </symbol>
          <symbol id="icon-minus" viewBox="0 0 9 1">
            <line x1="8.58536" y1="0.5" x2="0.780479" y2="0.5" stroke="currentcolor" />
          </symbol>
          <symbol id="icon-phone" viewBox="0 0 8 8">
            <path d="M7.53625 6.14136L5.8425 4.60136C5.76243 4.52859 5.65722 4.48978 5.54908 4.49312C5.44094 4.49647 5.33833 4.5417 5.26291 4.61928L4.26583 5.64469C4.02583 5.59886 3.54333 5.44844 3.04666 4.95303C2.55 4.45594 2.39958 3.97219 2.355 3.73386L3.37958 2.73636C3.45725 2.661 3.50255 2.55837 3.5059 2.4502C3.50924 2.34202 3.47036 2.23679 3.3975 2.15678L1.85791 0.463443C1.78501 0.383175 1.6837 0.334486 1.57548 0.327718C1.46726 0.320949 1.36066 0.356634 1.27833 0.427193L0.374162 1.20261C0.302125 1.27491 0.259129 1.37113 0.253329 1.47303C0.247079 1.57719 0.127912 4.04469 2.04125 5.95886C3.71041 7.62761 5.80125 7.74969 6.37708 7.74969C6.46125 7.74969 6.51291 7.74719 6.52666 7.74636C6.62854 7.74066 6.72472 7.69747 6.79666 7.62511L7.57166 6.72053C7.6425 6.63846 7.67845 6.53195 7.67183 6.42373C7.66522 6.31552 7.61656 6.21419 7.53625 6.14136Z" fill="white" />
          </symbol>
          <symbol id="icon-plus" viewBox="0 0 9 8">
            <line x1="8.2439" y1="4.11829" x2="0.439018" y2="4.11829" stroke="currentcolor" />
            <line x1="4.1785" y1="8" x2="4.1785" stroke="currentcolor" />
          </symbol>
          <symbol id="icon-search" viewBox="0 0 14 15">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.0276 9.52893L13.7934 13.2948C13.9257 13.4273 14.0001 13.6069 14 13.7942C13.9999 13.9814 13.9255 14.161 13.793 14.2934C13.6606 14.4257 13.481 14.5001 13.2937 14.5C13.1064 14.4999 12.9269 14.4255 12.7945 14.293L9.0287 10.5271C7.90295 11.3991 6.48731 11.8094 5.06977 11.6746C3.65223 11.5399 2.33927 10.8701 1.39799 9.80165C0.456712 8.73318 -0.0421836 7.34624 0.0027973 5.92299C0.0477782 4.49973 0.633257 3.14707 1.64013 2.14017C2.647 1.13327 3.99963 0.547779 5.42285 0.502797C6.84607 0.457815 8.23297 0.956724 9.30142 1.89803C10.3699 2.83933 11.0396 4.15233 11.1743 5.5699C11.3091 6.98748 10.8988 8.40315 10.0269 9.52893H10.0276ZM5.60026 10.2996C6.71412 10.2996 7.78235 9.85712 8.56997 9.06948C9.35759 8.28185 9.80007 7.21358 9.80007 6.0997C9.80007 4.98581 9.35759 3.91755 8.56997 3.12992C7.78235 2.34228 6.71412 1.89979 5.60026 1.89979C4.4864 1.89979 3.41817 2.34228 2.63055 3.12992C1.84293 3.91755 1.40046 4.98581 1.40046 6.0997C1.40046 7.21358 1.84293 8.28185 2.63055 9.06948C3.41817 9.85712 4.4864 10.2996 5.60026 10.2996Z" fill="currentcolor" />
          </symbol>
          <symbol id="icon-star" viewBox="0 0 14 12">
            <path d="M11.481 4.14845L8.65177 3.75745L7.38722 1.32696C7.16064 0.893731 6.50416 0.888224 6.27565 1.32696L5.01109 3.75745L2.18182 4.14845C1.67445 4.21821 1.47111 4.81115 1.83905 5.15075L3.88597 7.04154L3.40183 9.7125C3.31469 10.1953 3.85111 10.5569 4.30038 10.3311L6.83143 9.07L9.36248 10.3311C9.81176 10.5551 10.3482 10.1953 10.261 9.7125L9.7769 7.04154L11.8238 5.15075C12.1918 4.81115 11.9884 4.21821 11.481 4.14845ZM8.77958 6.73314L9.23854 9.27377L6.83143 8.07505L4.42432 9.27377L4.88328 6.73314L2.93513 4.93414L5.62691 4.56332L6.83143 2.25032L8.03595 4.56332L10.7277 4.93414L8.77958 6.73314Z" fill="#C90606" />
          </symbol>
          <symbol id="icon-success" viewBox="0 0 26 20">
            <path d="M9.32026 18.9812L0.964793 10.6727C0.916606 10.6247 0.878365 10.5678 0.852271 10.505C0.826177 10.4423 0.812744 10.375 0.812744 10.307C0.812744 10.2391 0.826177 10.1718 0.852271 10.109C0.878365 10.0463 0.916606 9.98932 0.964793 9.9414L3.07417 7.82969C3.27573 7.62812 3.60151 7.62812 3.80307 7.82969L9.30385 13.2977C9.50542 13.4992 9.83354 13.4969 10.0351 13.2953L22.1898 1.02344C22.3914 0.819531 22.7195 0.819531 22.9234 1.02109L25.0351 3.13281C25.2367 3.33437 25.2367 3.66016 25.0374 3.86172L11.7953 17.2234L11.7976 17.2258L10.0515 18.9812C9.84995 19.1828 9.52182 19.1828 9.32026 18.9812Z" fill="#C90606" />
          </symbol>
          <symbol id="icon-twitter" viewBox="0 0 24 24">
            <path xmlns="http://www.w3.org/2000/svg" fill="currentcolor" d="M12.0005 0.480469C5.63807 0.480469 0.480469 5.63807 0.480469 12.0005C0.480469 18.3629 5.63807 23.5205 12.0005 23.5205C18.3629 23.5205 23.5205 18.3629 23.5205 12.0005C23.5205 5.63807 18.3629 0.480469 12.0005 0.480469ZM16.6865 9.91727C16.6913 10.0157 16.6925 10.1141 16.6925 10.2101C16.6925 13.2101 14.4113 16.6673 10.2377 16.6673C9.00442 16.6693 7.79683 16.3151 6.76007 15.6473C6.93647 15.6689 7.11767 15.6773 7.30127 15.6773C8.36447 15.6773 9.34247 15.3161 10.1189 14.7065C9.64573 14.6972 9.18727 14.5405 8.8074 14.2583C8.42753 13.9761 8.14517 13.5824 7.99967 13.1321C8.33946 13.1967 8.68949 13.1831 9.02327 13.0925C8.50973 12.9886 8.04791 12.7104 7.71612 12.3049C7.38433 11.8994 7.203 11.3916 7.20287 10.8677V10.8401C7.50887 11.0093 7.85927 11.1125 8.23127 11.1245C7.74983 10.804 7.40901 10.3117 7.27852 9.74823C7.14803 9.18478 7.23773 8.59277 7.52927 8.09327C8.09921 8.79407 8.80998 9.36736 9.61555 9.77604C10.4211 10.1847 11.3035 10.4197 12.2057 10.4657C12.091 9.97884 12.1403 9.46776 12.3461 9.01187C12.5518 8.55599 12.9024 8.18086 13.3434 7.94479C13.7843 7.70871 14.2909 7.62494 14.7843 7.70647C15.2778 7.78801 15.7305 8.0303 16.0721 8.39567C16.5799 8.2952 17.0668 8.10893 17.5121 7.84487C17.3428 8.37063 16.9885 8.81708 16.5149 9.10127C16.9647 9.04709 17.4039 8.92616 17.8181 8.74247C17.5139 9.19834 17.1306 9.59619 16.6865 9.91727Z" />
          </symbol>
        </svg>
      </div>
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="title title--bigger page-content__title">Корзина</h1>
            <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
              <li className="breadcrumbs__item"><Link className="link" to={generatePath(AppRoute.Main)}>Главная</Link>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={generatePath(AppRoute.Main)}>Каталог</Link>
              </li>
              <li className="breadcrumbs__item"><Link className="link" to={generatePath(AppRoute.Main)}>Корзина</Link>
              </li>
            </ul>
            <div className="cart">
              {cardsCart?.map((card) => <CartItem key={card.id} type={card.type} stringCount={card.stringCount} price={card.price} name={card.name} vendorCode={card.vendorCode} previewImg={card.previewImg} count={card.count}/>)}
              <div className="cart__footer">
                <div className="cart__coupon coupon">
                  <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                  <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                  <form className="coupon__form" id="coupon-form" method='post' action='/' onSubmit={(evt) => {evt.preventDefault(); dispatchAction(postCoupon(coupon, setCouponIsOk, setCouponNotOk)); dispatchAction(setPromo(coupon));}}>
                    <div className="form-input coupon__input">
                      <label className="visually-hidden">Промокод</label>
                      <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" onChange={handleCouponChange}></input>
                      {couponIsOk ? <p className="form-input__message form-input__message--success">Промокод принят</p> : ''}
                      {couponNotOk ? <p className="form-input__message form-input__message--error">неверный промокод</p> : ''}
                      {couponValid ? '' : <p className="form-input__message form-input__message--error">Промокод не должен содержать пробелы</p>}
                    </div>
                    <button className="button button--big coupon__button">Применить</button>
                  </form>
                </div>
                <div className="cart__total-info">
                  <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{sum} ₽</span></p>
                  <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- {sum*(discount/100)} ₽</span></p>
                  <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{sum-(sum*(discount/100))} ₽</span></p>
                  <button className="button button--red button--big cart__order-button">Оформить заказ</button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className="footer__container container">
            <a className="footer__logo logo" href="main.html"><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" /></a>
            <div className="socials footer__socials">
              <ul className="socials__list">
                <li className="socials-item">
                  <a className="socials__link" href="https://www.facebook.com/" aria-label="facebook">
                    <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                      <use xlinkHref="#icon-facebook"></use>
                    </svg>
                  </a>
                </li>
                <li className="socials-item">
                  <a className="socials__link" href="https://www.instagram.com/" aria-label="instagram">
                    <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                      <use xlinkHref="#icon-instagram"></use>
                    </svg>
                  </a>
                </li>
                <li className="socials-item">
                  <a className="socials__link" href="https://www.twitter.com/" aria-label="twitter">
                    <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                      <use xlinkHref="#icon-twitter"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <section className="footer__nav-section footer__nav-section--info">
              <h2 className="footer__nav-title">О нас</h2>
              <p className="footer__nav-content footer__nav-content--font-secondary">Магазин гитар, музыкальных инструментов и гитарная мастерская <br /> в Санкт-Петербурге.<br /><br />Все инструменты проверены, отстроены <br /> и доведены до идеала!</p>
            </section>
            <section className="footer__nav-section footer__nav-section--links">
              <h2 className="footer__nav-title">Информация</h2>
              <ul className="footer__nav-list">
                <li className="footer__nav-list-item"><a className="link" href="#top">Где купить?</a>
                </li>
                <li className="footer__nav-list-item"><a className="link" href="#top">Блог</a>
                </li>
                <li className="footer__nav-list-item"><a className="link" href="#top">Вопрос - ответ</a>
                </li>
                <li className="footer__nav-list-item"><a className="link" href="#top">Возврат</a>
                </li>
                <li className="footer__nav-list-item"><a className="link" href="#top">Сервис-центры</a>
                </li>
              </ul>
            </section>
            <section className="footer__nav-section footer__nav-section--contacts">
              <h2 className="footer__nav-title">Контакты</h2>
              <p className="footer__nav-content">г. Санкт-Петербург,<br /> м. Невский проспект, <br />ул. Казанская 6.</p>
              <div className="footer__nav-content">
                <svg className="footer__icon" width="8" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-phone"></use>
                </svg><a className="link" href="tel:88125005050"> 8-812-500-50-50</a>
              </div>
              <p className="footer__nav-content">Режим работы:<br />
                <span className="footer__span">
                  <svg className="footer__icon" width="13" height="13" aria-hidden="true">
                    <use xlinkHref="#icon-clock"></use>
                  </svg><span> с 11:00 до 20:00</span><span>без выходных</span>
                </span>
              </p>
            </section>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}
export default Cart;
