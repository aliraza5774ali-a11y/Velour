import { useDispatch, useSelector } from 'react-redux';

// Plain JS versions (drop the TS generics if you're not using TypeScript).
// Navbar.jsx imports these from '../hooks/useRedux'.
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;