var imgArr1 = new Array();
        var imgArrLink1 = new Array();
        var imgCaption1 = new Array();
        var imgArr2 = new Array();
        var imgArrLink2 = new Array();
        var imgCaption2 = new Array();
        var imgArr3 = new Array();
        var imgArrLink3 = new Array();
        var imgCaption3 = new Array();
        imgArr1[0] = "http://www.bfbi.org.uk/binary_data/2039_Rankin_Brothers.jpg"; imgArrLink1[0] = "http://www.bfbi.org.uk/banner_click.php?banner_id=16"; imgCaption1[0] = "Quality Cork Stoppers, Cask & Keg Closures - Protecting your brand"; imgArr2[0] = "http://www.bfbi.org.uk/binary_data/4407_bfbi-banner-300x112-07-14.gif";
        imgArrLink2[0] = "http://www.bfbi.org.uk/banner_click.php?banner_id=29";
        imgCaption2[0] = "&nbsp;";
        imgArr3[0] = "http://www.bfbi.org.uk/binary_data/2895_innserve-banner.png";
        imgArrLink3[0] = "http://www.bfbi.org.uk/banner_click.php?banner_id=7";
        imgCaption3[0] = "&nbsp;";
        imgArr1[1] = "http://www.bfbi.org.uk/binary_data/2941_par-group.jpg"; imgArrLink1[1] = "http://www.bfbi.org.uk/banner_click.php?banner_id=25"; imgCaption1[1] = "&nbsp;"; imgArr2[1] = "http://www.bfbi.org.uk/binary_data/2852_uk-doc-banner-bevex-0113.png";
        imgArrLink2[1] = "http://www.bfbi.org.uk/banner_click.php?banner_id=6";
        imgCaption2[1] = "&nbsp;";
        imgArr3[1] = "http://www.bfbi.org.uk/binary_data/2041_Hallamshire_logo_.jpg";
        imgArrLink3[1] = "http://www.bfbi.org.uk/banner_click.php?banner_id=17";
        imgCaption3[1] = "Refurbishment of Cooling & Dispense Equipment";
        imgArr1[2] = "http://www.bfbi.org.uk/binary_data/2023_338x74-banner-ad-v2.gif"; imgArrLink1[2] = "http://www.bfbi.org.uk/banner_click.php?banner_id=1"; imgCaption1[2] = "Quality Assured - Performance Guaranteed"; imgArr2[2] = "http://www.bfbi.org.uk/binary_data/5136_brauwelt-bfbi.gif";
        imgArrLink2[2] = "http://www.bfbi.org.uk/banner_click.php?banner_id=30";
        imgCaption2[2] = "&nbsp;";
        imgArr3[2] = "http://www.bfbi.org.uk/binary_data/2972_php-banner.jpg";
        imgArrLink3[2] = "http://www.bfbi.org.uk/banner_click.php?banner_id=13";
        imgCaption3[2] = "&nbsp;";
        imgArr1[3] = "http://www.bfbi.org.uk/binary_data/2053_CAL_Systems_logo_master_NO_BANNER_WORD.jpg"; imgArrLink1[3] = "http://www.bfbi.org.uk/banner_click.php?banner_id=23"; imgCaption1[3] = "Process Control & Automation"; imgArr2[3] = "http://www.bfbi.org.uk/binary_data/2025_Murphy_mini_Logo.JPG";
        imgArrLink2[3] = "http://www.bfbi.org.uk/banner_click.php?banner_id=5";
        imgCaption2[3] = "The One Stop Shop for Raw Materials, Products & Services";
        imgArr3[3] = "http://www.bfbi.org.uk/binary_data/2893_novozymes-f-b-banner.jpg";
        imgArrLink3[3] = "http://www.bfbi.org.uk/banner_click.php?banner_id=2";
        imgCaption3[3] = "&nbsp;";
        imgArr1[4] = "http://www.bfbi.org.uk/binary_data/2013_cryologo.jpg"; imgArrLink1[4] = "http://www.bfbi.org.uk/banner_click.php?banner_id=3"; imgCaption1[4] = "Leisure and Cellar Gas"; imgArr2[4] = "http://www.bfbi.org.uk/binary_data/3106_bw-logo.jpg";
        imgArrLink2[4] = "http://www.bfbi.org.uk/banner_click.php?banner_id=27";
        imgCaption2[4] = "&nbsp;";
        imgArr3[4] = "http://www.bfbi.org.uk/binary_data/2049_ProMinent_Logo_4c.jpg";
        imgArrLink3[4] = "http://www.bfbi.org.uk/banner_click.php?banner_id=21";
        imgCaption3[4] = "Experts in Chem-Feed & Water Treatment";
        imgArr1[5] = "http://www.bfbi.org.uk/binary_data/2051_MF-logo-large_Aug_09_copy.jpg"; imgArrLink1[5] = "http://www.bfbi.org.uk/banner_click.php?banner_id=22"; imgCaption1[5] = "Leading Supplier of Cooling Equipment"; imgArr2[5] = "http://www.bfbi.org.uk/binary_data/2055_dd-877-BFBi-web-banner.jpg";
        imgArrLink2[5] = "http://www.bfbi.org.uk/banner_click.php?banner_id=14";
        imgCaption2[5] = "The Colour House";
        imgArr3[5] = "http://www.bfbi.org.uk/binary_data/2035_Valpar_Logo_(MAR_08).JPG";
        imgArrLink3[5] = "http://www.bfbi.org.uk/banner_click.php?banner_id=12";
        imgCaption3[5] = "Flexible Solutions";
        imgArr1[6] = "http://www.bfbi.org.uk/binary_data/3075_bfbi-banner.gif"; imgArrLink1[6] = "http://www.bfbi.org.uk/banner_click.php?banner_id=15"; imgCaption1[6] = "&nbsp;"; var tmpSize3 = imgArr3.length;
        for (i = 0; i < tmpSize3; i++) {
            preLoad3[i] = new Image();
            preLoad3[i].src = imgArr3[i];
            if (imgCaption3[i] == '&nbsp;') {
                preLoad3[i].height = 112;
            } else {
                preLoad3[i].height = 75;
            }
        }
        var tmpSize2 = imgArr2.length;
        for (i = 0; i < tmpSize2; i++) {
            preLoad2[i] = new Image();
            preLoad2[i].src = imgArr2[i];
            if (imgCaption2[i] == '&nbsp;') {
                preLoad2[i].height = 112;
            } else {
                preLoad2[i].height = 75;
            }
        }
        var tmpSize1 = imgArr1.length;
        for (i = 0; i < tmpSize1; i++) {
            preLoad1[i] = new Image();
            if (imgCaption1[i] == '&nbsp;') {
                imgArr1[i].height = 112;
                preLoad1[i].height = 112;
            } else {
                imgArr1[i].height = 75;
                preLoad1[i].height = 75;
            }
            preLoad1[i].src = imgArr1[i];
        }
        slideShow();

	
	
	  //settings
        var $slider = $('.slider'); // class or id of carousel slider
        var $slide = 'li'; // could also use 'img' if you're not using a ul
        var $transition_time = 1000; // 1 second
        var $time_between_slides = 4000; // 4 seconds

        function slides() {
            return $slider.find($slide);
        }

        slides().fadeOut();

        // set active classes
        slides().first().addClass('active');
        slides().first().fadeIn($transition_time);

        // auto scroll 
        $interval = setInterval(
            function () {
                var $i = $slider.find($slide + '.active').index();

                slides().eq($i).removeClass('active');
                slides().eq($i).fadeOut($transition_time);

                if (slides().length == $i + 1) $i = -1; // loop to start

                slides().eq($i + 1).fadeIn($transition_time);
                slides().eq($i + 1).addClass('active');
            }
            , $transition_time + $time_between_slides
        );
