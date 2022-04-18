// =============  BASE ============
const BASE_URL = 'https://swapi.dev/api/'
const LIMIT = 10
const ALL_PAGES = Math.ceil(82 / LIMIT)
const routeOptions = [
	{
		title: 'People',
		route: 'people',
	},
	{
		title: 'Planets',
		route: 'planets',
	},
	{
		title: 'Starships',
		route: 'starships',
	},
]
// ================== IMPORTS =================
const $container = document.querySelector('.container')
const $loader = document.querySelector('.row')
const $selectSort = document.querySelector('.selectSort')
const $prev = document.querySelector('.previous')
const $next = document.querySelector('.next')
const $current = document.querySelector('.current')
const $pagination = document.querySelector('.pagination')
// ============ STATES ================
let currentPage = 1
// =====================================================================================

function getBase(url, query, callback) {
	fetch(`${url}?${query}`)
		.then((r) => r.json())
		.then((res) => callback(res))
}

window.addEventListener('load', () => {
	$loader.innerHTML = `<div class="lds-dual-ring"></div>`
	getBase(`${BASE_URL}people`, '', (cb) => {
		cardTemplate(cb.results)
	})
	currentChanging()
})

window.addEventListener('load', () => {
	$selectSort.innerHTML = selectTemplate(routeOptions)
})

function selectTemplate(base) {
	const template = base
		.map(({ title, route }) => {
			return `
			<option id="${route}">${title}</option>
		`
		})
		.join('')
	return template
}

$selectSort.addEventListener('change', (e) => {
	const val = e.target.value
	console.log(val)
	getBase(`${BASE_URL}${val.toLowerCase()}`, '', (cb) => {
		cardTemplate(cb.results)
	})
})

function currentChanging() {
	$current.innerHTML = `<span>${currentPage}/</span> <span>${ALL_PAGES}</span>`
}

function cardTemplate(base) {
	const template = base
		.map(({ name, url }) => {
			return card(name, url)
		})
		.join('')
	$container.innerHTML = template
}

function card(name, url) {
	return `
		<div class="card">
			<div class="card-header">
				<h3>${name.length > 15 ? name.slice(0, 15) + '...' : name}</h3>
			</div>
			<div class="card-body">
				<img src="https://lumiere-a.akamaihd.net/v1/images/622667eb0644dc0001a081fd-image_84d35559.jpeg?region=336%2C0%2C864%2C864">
			</div>
			<div class="card-footer">
				<button class="moreBtn" onclick="checkMoreFunction('${url}')">More</button>
			</div>
		</div>
	`
}

function checkMoreFunction(url) {
	$pagination.classList.add('active')
	getBase(url, '', (res) => {
		if (res.orbital_period) {
			moreFunctionPlanets(url)
		} else if (res.skin_color) {
			moreFunctionPeople(url)
		} else if (res.manufacturer) {
			moreFunctionStarships(url)
		}
	})
}
function moreFunctionPeople(url) {
	getBase(
		url,
		'',
		({ name, height, mass, eye_color, skin_color, birth_year, gender }) => {
			morePeople(name, height, mass, eye_color, skin_color, birth_year, gender)
		}
	)
}

function morePeople(
	name,
	height,
	mass,
	eye_color,
	skin_color,
	birth_year,
	gender
) {
	const template = `
		<div class="moreCard">
			<div clas="moreCard-header">
				<h4 class="moreTitle">${name}</h4>
			</div>
			<div class="moreCard-body">
				<ul>
					<li><span>Height: </span><span>${height}cm</span></li>
					<li><span>Mass: </span><span>${mass}kg</span></li>
					<li><span>Eye Color: </span><span class="color" style="background:${eye_color}"></span></li>
					<li><span>Skin Color: </span><span class="color" style="background:${skin_color}"></span></li>
					<li><span>Birth: </span><span>${birth_year}</span></li>
					<li><span>Gender</span><span>${gender}</span></li>
				</ul>
			</div>
			<div class="back">
				<button class="backBtn" onclick="back()">Back</button>
			</div>
		</div>
	`
	$container.innerHTML = template
}

function moreFunctionPlanets(url) {
	getBase(
		`${url}`,
		'',
		({
			climate,
			created,
			name,
			rotation_period,
			orbital_period,
			diameter,
			gravity,
			terrain,
			surface_water,
			population,
		}) =>
			morePlanets(
				climate,
				created,
				name,
				rotation_period,
				orbital_period,
				diameter,
				gravity,
				terrain,
				surface_water,
				population
			)
	)
}

function morePlanets(
	climate,
	created,
	name,
	rotation_period,
	orbital_period,
	diameter,
	gravity,
	terrain,
	surface_water,
	population
) {
	$container.innerHTML = `
			<div class="moreCard">
				<div clas="moreCard-header">
					<h4 class="moreTitle">${name}</h4>
				</div>
				<div class="moreCard-body">
					<ul>
						<li><span>Created: </span><span>${created}</span></li>
						<li><span>Climate: </span><span>${climate}</span></li>
						<li><span>Rotation Period: </span><span>${rotation_period}</span></li>
						<li><span>Orbital Period: </span><span>${orbital_period}</span></li>
						<li><span>Diameter: </span><span>${diameter} km</span></li>
						<li><span>Gravity: </span><span>${gravity}</span></li>
						<li><span>Terrain: </span><span>${terrain}</span></li>
						<li><span>Population: </span><span>${population}</span></li>
						<li><span>Surface Water: </span><span>${surface_water}</span></li>
					</ul>
				</div>
				<div class="back">
					<button class="backBtn" onclick="back()">Back</button>
				</div>
			</div>
	`
}

function moreFunctionStarships(url) {
	getBase(
		url,
		'',
		({
			name,
			model,
			manufacturer,
			length,
			max_atmosphering_speed,
			passengers,
			starship_class,
			crew,
			cost_in_credits,
			MGLT,
		}) => {
			moreStarships(
				name,
				model,
				manufacturer,
				length,
				max_atmosphering_speed,
				passengers,
				starship_class,
				crew,
				cost_in_credits,
				MGLT
			)
		}
	)
}

function moreStarships(
	name,
	model,
	manufacturer,
	length,
	max_atmosphering_speed,
	passengers,
	starship_class,
	crew,
	cost_in_credits,
	MGLT
) {
	$container.innerHTML = `
			<div class="moreCard">
				<div clas="moreCard-header">
					<h4 class="moreTitle">${name}</h4>
				</div>
				<div class="moreCard-body">
					<ul>
						<li><span>Model: </span><span>${model}</span></li>
						<li><span>Manufacturer: </span><span>${
							manufacturer.length > 30
								? manufacturer.slice(0, 30) + '...'
								: manufacturer
						}</span></li>
						<li><span>Cost: </span><span>${cost_in_credits}</span></li>
						<li><span>Length: </span><span>${length}</span></li>
						<li><span>Max Atmosphering Speed: </span><span>${max_atmosphering_speed}</span></li>
						<li><span>Passengers: </span><span>${passengers}</span></li>
						<li><span>Starship Class: </span><span>${starship_class}</span></li>
						<li><span>Crew: </span><span>${crew}</span></li>
						<li><span>MGLT: </span><span>${MGLT}</span></li>
					</ul>
				</div>
				<div class="back">
					<button class="backBtn" onclick="back()">Back</button>
				</div>
			</div>
	`
}

function back() {
	location.reload()
}

$prev.addEventListener('click', (e) => {
	if (currentPage > 1) {
		currentPage--
	} else {
		currentPage
	}
	currentChanging()

	getBase(`${BASE_URL}people/`, `page=${currentPage}`, (res) =>
		cardTemplate(res.results)
	)
	e.preventDefault()
})

$next.addEventListener('click', (e) => {
	e.preventDefault()
	if (currentPage < ALL_PAGES) {
		currentPage++
	} else {
		currentPage
	}
	currentChanging()
	getBase(`${BASE_URL}people/`, `page=${currentPage}`, (res) =>
		cardTemplate(res.results)
	)
})
