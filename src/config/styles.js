import NavBar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';


export const RegisterStyles = () => {
  bootstrapUtils.addStyle(NavBar, 'principal');
  bootstrapUtils.addStyle(Button, 'default-custom');
  bootstrapUtils.addStyle(Button, 'primary-custom');
}
