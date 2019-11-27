import React, { Component } from 'react';
import {Router, Stack, Scene, Drawer, Actions} from 'react-native-router-flux';
import TabIcon from './components/TabIcon';
import {Text} from 'react-native';
import Login from './pages/Login';
import Signup from './pages/Signup';
import loginSuccess from './pages/loginSuccess';
import MainPage from './pages/MainPage/MainPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import CartPage from './pages/CartPage/CartPage';
import DetailPage from './pages/DetailPage/DetailPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AddProduct from './pages/AddProduct/AddProduct';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import SearchPage from './pages/SearchPage/SearchPage';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CartPageTest from './pages/CartPage/CartPageTest';
import ListProduct from './pages/ListProduct/ListProduct';
import filterPricePage from './pages/filterPricePage/filterPricePage';
import NavigatePage from './pages/NavigatePage/NavigatePage';
import PDFpage from './pages/PDFpage/PDFpage';
import SellReportPage from './pages/SellReportPage/SellReportPage';
import ReportDatePage from './pages/ReportDatePage/ReportDatePage';
import ReportOrderDetails from './pages/ReportOrderDetails/ReportOrderDetails';
import AddProductCategory from './pages/AddProductCategory/AddProductCategory';
import CategoryManagementPage from './pages/CategoryManagementPage/CategoryManagementPage';
import AddressManagementPage from './pages/AddressManagementPage/AddressManagementPage';
import AddAddressPage from './pages/AddAddressPage/AddAddressPage';
import EditAddressPage from './pages/EditAddressPage/EditAddressPage';
import ProductImageManagement from './pages/ProductImageManagement/ProductImageManagement';
import EditProductPage from './pages/EditProductPage/EditProductPage';
import MerchantProductsPage from './pages/MerchantProductsPage/MerchantProductsPage';
import EditProfilePage from './pages/EditProfilePage/EditProfilePage';
import AdminProductListPage from './pages/AdminProductListPage/AdminProductListPage';
import ProfileListPage from './pages/ProfileListPage/ProfileListPage';
import AdminSellReportPage from './pages/AdminSellReportPage/AdminSellReportPage';
import MainMenuPage from './pages/MainMenuPage/MainMenuPage';
import AccountMenuPage from './pages/AccountMenuPage/AccountMenuPage';
import MerchantMenuPage from './pages/MerchantMenuPage/MerchantMenuPage';
import MerchantOrderListPage from './pages/MerchantOrderListPage/MerchantOrderListPage';
import AdminMenuPage from './pages/AdminMenuPage/AdminMenuPage';



  
export default class Routes extends Component {
	
	render() {
		
		return(
			
			<Router>
				
			    <Stack key="root" hideNavBar={true}>
					
				<Scene
          key="tabbarx"
          tabs={true}
		  tabBarStyle={{ backgroundColor: '#FFFFFF' }}
		  showLabel={false}
		  hideNavBar={true}
		
        >
				
				
            <Scene
              key="MainPage"
              component={MainPage}
			  title="home"
			  icon={TabIcon}
			  hideNavBar={true}
            />
            
          
		
            <Scene
			
              key="CartPageTest"
              component={CartPageTest}
			  title="cart"
			  icon={TabIcon}
			  onEnter={()=>{CartPageTest.onEnterSomeView(); }}
            />
           
	
		
		<Scene
          key="tabbar"
          tabs={true}
		  tabBarStyle={{top:0,backgroundColor:'#FF9501'}} 
		  showLabel={true}
		  hideNavBar={true}
		  tabBarPosition='top'
		  title="person"
		  icon={TabIcon}
        >
		
	
		<Scene key="AccountMenuPage" 
		component={AccountMenuPage} 
		onEnter={()=>{AccountMenuPage.onEnterSomeView(); }}
		title="Akun Pembeli"
		hideNavBar={true}  /> 
          
   <Scene key="MerchantMenuPage"
	component={MerchantMenuPage} 
	onEnter={()=>{AccountMenuPage.onEnterSomeView(); }}
	 hideNavBar={true}
		   title="Akun Merchant"/>

			</Scene>
				 </Scene>

			
				  <Scene key="DetailPage" component={DetailPage} title="DetailPage"/>
				  <Scene
			onEnter={()=>{global.cartChanged=true}}
              key="CartPageTestx"
              component={CartPageTest}
			  title="cart"
			 
            />
				<Scene
              key="NavigatePage"
              component={NavigatePage}
			  title="Akun Pembeli"
			 // icon={TabIcon}
			  hideNavBar={true}
            />
			   <Scene key="ForgotPasswordPage"
	component={ForgotPasswordPage} 
	 title="trash"
		  icon={TabIcon}
		   title="ForgotPasswordPage"/>
		 
		   			<Scene key="AdminMenuPage" component={AdminMenuPage} title="AdminMenuPage" />
				  <Scene key="Login" component={Login} title="Login" />
				  <Scene key="MerchantOrderListPage" component={MerchantOrderListPage} title="MerchantOrderListPage" />
			      <Scene key="signup" component={Signup} title="Register" />
				  <Scene key="MainPage" component={MainPage} title="MainPage" />
				  <Scene key="loginSuccess" component={loginSuccess} title="loginSuccess"/>
				  <Scene key="CategoriesPage" component={CategoriesPage} title="CategoriesPage"/>
				  <Scene key="CartPage" component={CartPage} title="CartPage"/>
				  <Scene key="DetailPage" component={DetailPage} title="DetailPage"/>
				  <Scene key="RegisterPage" component={RegisterPage} title="RegisterPage" />
				  <Scene key="AddProduct" component={AddProduct} title="AddProduct" />
				  <Scene key="ForgotPasswordPage" component={ForgotPasswordPage} title="ForgotPasswordPage"/>
				  <Scene key="SearchPage" component={SearchPage} title="SearchPage"  />
				  <Scene key="OrderPage" component={OrderPage} title="OrderPage"  />
				  <Scene key="OrderListPage" component={OrderListPage} title="OrderListPage"  />
				  <Scene key="OrderDetailPage" component={OrderDetailPage} title="OrderDetailPage"  />
				  <Scene key="CartPageTest" component={CartPageTest} title="CartPageTest"    />
				  <Scene key="ListProduct" component={ListProduct} title="ListProduct"    />
				  <Scene key="filterPricePage" component={filterPricePage} title="filterPricePage"   />
				  <Scene key="PDFpage" component={PDFpage} title="PDFpage"    />
				  <Scene key="SellReportPage" component={SellReportPage} title="SellReportPage"   />
				  <Scene key="ReportDatePage" component={ReportDatePage} title="ReportDatePage"    />
				  <Scene key="ReportOrderDetails" component={ReportOrderDetails} title="ReportOrderDetails"    />
				  <Scene key="AddProductCategory" component={AddProductCategory} title="AddProductCategory"     />
				  <Scene key="CategoryManagementPage" component={CategoryManagementPage} title="CategoryManagementPage"   />
				  <Scene key="AddressManagementPage" component={AddressManagementPage} title="AddressManagementPage"   />
				  <Scene key="AddAddressPage" component={AddAddressPage} title="AddAddressPage"   />
				  <Scene key="EditAddressPage" component={EditAddressPage} title="EditAddressPage"   />
				  <Scene key="ProductImageManagement" component={ProductImageManagement} title="ProductImageManagement"  />
				  <Scene key="EditProductPage" component={EditProductPage} title="EditProductPage"  />
				  <Scene key="MerchantProductsPage" component={MerchantProductsPage} title="MerchantProductsPage"   />
				  <Scene key="ProfilePage" component={ProfilePage} title="ProfilePage"  />
				  <Scene key="EditProfilePage" component={EditProfilePage} title="EditProfilePage"   />
				  <Scene key="AdminProductListPage" component={AdminProductListPage} title="AdminProductListPage"   />
				  <Scene key="ProfileListPage" component={ProfileListPage} title="ProfileListPage"   />
				  <Scene key="AdminSellReportPage" component={AdminSellReportPage} title="AdminSellReportPage"   />
				  <Scene key="MainMenuPage" component={MainMenuPage} title="MainMenuPage"   /> 
				  <Scene key="AccountMenuPage" component={AccountMenuPage} title="AccountMenuPage"   /> 
			    </Stack>


			 </Router>
			)
	}
}

