const firstNames = ["Nancy","James","Jaime","Winston","Christina","Jennifer","Juan",
                "Vincent","George","Panther","Dragon","Regis","Jazzy","Fruity","Roger","Denise","Sophia","Emma","Olivia",
                "Isabella","Mia","Ava","Lily","Zoe","Emily","Chloe","Layla","Madison","Madelyn","Abigail","Aubrey","Charlotte",
                "Amelia","Ella","Kaylee","Avery","Aaliyah","Hailey","Hannah","Addison","Riley","Harper","Aria","Jackson","Aiden",
                "Liam","Lucas", "Noah","Mason","Jayden","Ethan","Jacob","Jack","Caden","Logan","Benjamin", "Michael", "Connor",
                "Matthew","Daniel","Luke","Brayden", "Jayce","Max","Cameron","Kylie","Audrey","Gabriella","Elena","Victoria","Claire",
                "Colton", "Tyler","John","Gavin","Wyatt", "Leo","Jonathan","Adrian","Hudson", "Ian","Xander","Carson","Jason", "Nolan",
                "Cooper","Julia","Sadie","Callie","Kaelyn","Alexa", "Molly","Reagan","Stella","Jake", "Asher","Cole","Mateo","Skyler",
                "Jordan","Elliot"];

const lastNames = [ "Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson",
             "Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","Lee","Gonzalez",
             "Clark","Walker","Harris","Clark","Young","Allen","Sanchez","King","Adams","Nelson","Hill","Cooper",
             "Reed","Bailey","Bell","Gomez","Kelly","Howard","Ward","Cox","Diaz","Richardson","Brooks","Gray","Bennett","Marshall",
             "Owens","Mendoza","Castillo","Olson","Webb","Washington","Burns","Henry","Snyder","Simpson","Crawford","Jimenez","Porter",
             "Lawrence","Wheeler","Jacobs","Obrien","Lynch","Bishop","Austin", "Mendez","Gilbert","Jensen","Williamson","Montgomery",
             "Perkins","Harper","George","Carr","Austin","Williamson","Harvey","Hardy","Curtis","Pena","Rios","Sandoval","Hopkins",
             "Keller","McKinney","Reeves","Klein","Terry","Wolfe","Horton","Lyons","Fletcher","Zimmerman","Mann","Avila",
             "Sherman","Hines","Farmer","Duran"]

function findPlace(x) {
	// Finds the 'place' of the number X
	// e.g. x = 43,210 findPlace(x) = 10,000
	n = 1;
	while (x >= 10) {
		x /= 10;
		n *= 10;
	}
	return n;
}

function findMaxFromPlace(x) {
	// Finds the max number of length X
	n = 1;
	y = 0;
	for (i = 1; i <= x; i++) {
		y += 9 * n;
		n *= 10;
	}

	return y;
}

function randomNumWithXDigits(n) {
	// With n = 5 places
	// y = 99999
	// x = 10000
	// result example: 12345

	var y = findMaxFromPlace(n);
	var x = findPlace(y);
	return Math.floor(Math.random() * (y - x) + x);
}

function randomNumBetween(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randomPhone() {
	return ("(" + randomNumWithXDigits(3) + ") " + randomNumWithXDigits(3) + "-" + randomNumWithXDigits(4));
}

function randomSocial() {
	return (randomNumWithXDigits(3) + "-" + randomNumWithXDigits(2) + "-" + randomNumWithXDigits(4));
}

function randomValidCC(digits) {
	function luhn(d) {
		var res = 0;
		var inc = d.length % 2;
		for (var i = 0; i < d.length; ++i) {
			var n = Number(d.charAt(i)) * (2 - (i + inc) % 2);
			res += n > 9 ? n - 9 : n;
		}
		return res;
	}
	var checksum = luhn(digits) % 10;
	var cs = luhn(digits + "0") % 10;
	var checkdigit = cs ? 10 - cs : 0;

	return digits + checkdigit;
}