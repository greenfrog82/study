let i = 5;
let j = 100;

switch(i) {
	case 1: {
        console.log(1);
        break
    }
    case i < 10: {
        console.log(2);
        //if(1) {
        //    break;
        //}
        console.log('====');
        break;
    }
    default: { // It is possible where default keyword is first line.
        console.log('default');
    }
}


