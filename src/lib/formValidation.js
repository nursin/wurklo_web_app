export default function regexPhoneNumber(str) {
	const regexPhoneNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; 
  
	if (str.match(regexPhoneNumber)) {
		return true;
	} else {
		return false;
	}
}