import React from 'react';
import Footer from '@theme-original/Footer';

export default function FooterWrapper(props) {
  return (
    <>
      {/* <div class="absolute z-40 lg:z-50 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div class="w-[108rem] flex-none flex justify-end">
          <picture>
            <source srcset="/img/beams/docs@30.avif" type="image/avif"/>
            <img src="/img/beams/docs@tinypng.png" alt="" class="w-[71.75rem] flex-none max-w-none dark:hidden"/>
          </picture>
          <picture>
            <source srcset="/img/beams/docs-dark@30.avif" type="image/avif"/>
            <img src="/img/beams/docs-dark@tinypng.png" alt="" class="w-[90rem] flex-none max-w-none hidden dark:block"/>
          </picture>
        </div>
      </div> */}

      <Footer {...props} />
      <div class="footer pb-6 pt-0" >        
        <img class="mx-auto" style={ {marginLeft: "auto", marginRight: "auto", display: "block"}} src="https://www.steedos.com/img/QR_contact1.png" alt="微信扫码" width="587" height="216" />
      </div>
    </>
  );
}
