const d = document,
$cripto = d.getElementById("cripto"),
$coin = d.getElementById("coin"),
$resultados = d.querySelector(".resultados"),
$submit = d.querySelector(".submit"),
$fragment = d.createDocumentFragment()

const getCriptos = async() =>{
    $resultados.innerHTML = ""
    try {
        let res  = await fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=MXN`),
        json = await res.json()

        if(!res.ok) throw{status: res.status, statusText: res.statusText}

        json.Data.forEach(ele => {
            let name = ele.CoinInfo.FullName,
            value = ele.CoinInfo.Name,
            $option = d.createElement("option")
            $option.innerHTML = name
            $option.setAttribute("value", `${value}`)

            $cripto.appendChild($option)
        });

    } catch (err) {
        let message = err.statusText || "Ocurrió un error",
        $h3 = d.createElement("h3")
        $h3.innerHTML = `Error ${err.status}: ${message}`
        $h3.classList.add("error")
        $fragment.appendChild($h3)
        $resultados.appendChild($fragment)
    }
}

const getCriptoValue = async(coin, cripto) =>{
    $resultados.innerHTML = ""
    const $spinner = d.createElement("img")
    $spinner.setAttribute("src", "./svg/spin.svg")
    $resultados.appendChild($spinner)
    try {
        let res = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${coin}`),
        json = await res.json()

        if(!res.ok) throw{status: res.status, statusText: res.statusText}

        let $h3 = d.createElement("h3"),
        $h5_high = d.createElement("h5"),
        $h5_low = d.createElement("h5"),
        $h5_changepct = d.createElement("h5"),
        $h5_update = d.createElement("h5"),
        info = json.DISPLAY[cripto][coin]

        $h3.innerHTML = `El precio es: <b>${info.PRICE}</b>`
        $fragment.appendChild($h3)

        $h5_high.innerHTML = `El precio más alto del día: <b>${info.HIGHDAY}</b>`
        $fragment.appendChild($h5_high)

        $h5_low.innerHTML = `El precio más bajo del día: <b>${info.LOWDAY}</b>`
        $fragment.appendChild($h5_low)

        $h5_changepct.innerHTML = `Variación últimas 24 horas: <b>${info.CHANGEPCTDAY}%</b>`
        $fragment.appendChild($h5_changepct)

        $h5_update.innerHTML = `Última actualización: <b>${info.LASTUPDATE}</b>`
        $fragment.appendChild($h5_update)

        $resultados.innerHTML = ""
        $resultados.appendChild($fragment)


    } catch (err) {
        let message = err.statusText || "Ocurrió un error",
        $h3 = d.createElement("h3")
        $h3.innerHTML = `Error ${err.status} : ${message}`
    }
}

document.addEventListener("DOMContentLoaded", e =>{
    getCriptos()
})

$submit.addEventListener("click", e=>{
    if($cripto.value === "" || $coin.value === ""){
        $resultados.innerHTML = ""
        let $h3 = d.createElement("h3")
        $h3.innerHTML=`Ambos campos son obligatorios`
        $h3.classList.add("error")
        $resultados.appendChild($h3)
    } else{
        let cripto = $cripto.value,
        coin = $coin.value
        getCriptoValue(coin, cripto)
    }
})