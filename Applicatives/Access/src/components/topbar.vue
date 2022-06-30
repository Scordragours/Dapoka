<template>
    <div class="topbar">
      <nav>

         <div class="imagelogo">
                <router-link to='/' exact>
                  <img class="logoimg" src="../../logodapoka.svg" height="45" alt="logo dapoka"/>
                </router-link>
                
         </div>
        <div class="menulogo">
                <router-link to='/sommaire' exact>
                  <img class="menuimg" src="../../icons8-menu.svg" height="45" alt="logo dapoka"/>
                </router-link>
                
         </div>    
         <div class="nav-items">
            <li><router-link to='/apropos' exact>à propos</router-link></li>
            <li><router-link to="/client" exact>mon compte</router-link></li>
            <li><router-link to='/historique'>mes commandes</router-link></li>
            
         </div>

         <form action="#">
            <input type="search" class="search-data" placeholder="Trouver un restaurant..." required>
            
         </form>

      </nav>

    </div>
</template>

<script>
export default {
    name: 'topbar',

}
</script>

<style>
@import url('http://fonts.cdnfonts.com/css/medula-one');
*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  
}

nav{
  background: #B1D5EA;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 60px;
  
}
nav .menulogo {
  display: none;
  margin: 0% 50% 0% 0%;
}

nav .imagelogo,



nav .nav-items{
  display: flex;
  padding: 0 0 0 50px;
}
nav .nav-items li{
  list-style: none;
  padding: 0 15px;
}
nav .nav-items li a{
  color: #fff;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  text-decoration: none;
}
nav .nav-items li a:hover{
  color: #445863;
}
nav form{
  display: flex;
  height: 40px;
  padding: 2px;
  background: #fff;
  min-width: 30%!important;
  border-radius: 2px;
  border: 1px solid rgba(68,88,99,0.2);
}
nav form .search-data{
  width: 100%;
  height: 100%;
  padding: 0 10px;
  color: #445863;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  border: none;
  font-weight: 500;
  background: none;
}

nav .menu-icon,
nav .cancel-icon,

nav .menu-icon span,
nav .cancel-icon,
nav .search-icon{
  display: none;
}
@media (max-width: 1245px) {
  nav{
    padding: 0 0px;
  }
}
@media (max-width: 1140px){
  nav{
    padding: 0px;
  }

  nav .menulogo {
    display: contents;
    margin: 0% 50% 0% 0%;
  }

  nav .imagelogo{
    flex: 2;
    text-align: center;
  }
  nav .nav-items{
    position: fixed;
    z-index: 99;
    top: 70px;
    width: 100%;
    left: -100%;
    height: 100%;
    padding: 10px 50px 0 50px;
    text-align: center;
    background: #B1D5EA;
    display: inline-block;
    transition: left 0.3s ease;
  }
  nav .nav-items.active{
    left: 0px;
  }
  nav .nav-items li{
    line-height: 40px;
    margin: 30px 0;
  }
  nav .nav-items li a{
    font-size: 14px;
  }
  nav form{
    position: absolute;
    top: 80px;
    right: 50px;
    opacity: 0;
    pointer-events: none;
    transition: top 0.3s ease, opacity 0.1s ease;
  }
  nav form.active{
    top: 95px;
    opacity: 1;
    pointer-events: auto;
  }
  nav form:before{
    position: absolute;
    content: "";
    top: -13px;
    right: 0px;
    width: 0;
    height: 0;
    z-index: -1;
    border: 10px solid transparent;
    border-bottom-color: #B1D5EA;
    margin: -20px 0 0;
  }
  nav form:after{
    position: absolute;
    content: '';
    height: 60px;
    padding: 2px;
    background: #B1D5EA;
    border-radius: 2px;
    min-width: calc(100% + 20px);
    z-index: -2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  nav .menu-icon{
    display: block;
  }
  nav .search-icon,
  nav .menu-icon span{
    display: block;
  }
  nav .menu-icon span.hide,
  nav .search-icon.hide{
    display: none;
  }
  nav .cancel-icon.show{
    display: block;
  }
}


</style>