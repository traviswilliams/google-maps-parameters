//https://moz.com/ugc/everything-you-never-wanted-to-know-about-google-maps-parameters
var googleParams = [
		{ id: "ie", text: "Input Encoding", type: "select", values: [ { id: "UTF8", text: "Default: UTF8" } ] },
		{ id: "f", text: "Display", type: "select", values: [ { id: "", text: "Default"}, { id: "q", text: "standard" }, { id: "d", text: "Directions" }, { id: "l", text: "Local" } ] },
		{ id: "dirflg", text: "Route Options", type: "select", values: [ { id: "", text: "Default"}, { id: "h", text: "No Motorways"}, { id: "r", text: "Public Transit"}, { id: "rB", text: "Public Transit - Prefer Bus"}, { id: "w", text: "Walking"} ] },
		{ id: "q", text: "Location", type: "text", value: "" },
		{ id: "near", text: "Nearby", type: "text", value: "" },
		{ id: "z", text: "Zoom", type: "select", values: [ { id: "", text: "Default"}, { id: "11", text: "11"}, { id: "12", text: "12"}, { id: "13", text: "13"}, { id: "14", text: "14"}, { id: "15", text: "15"}, { id: "16", text: "16"}, { id: "17", text: "17"}, { id: "18", text: "18"}, { id: "19", text: "19"} ] },
		//{ id: "spn", text: "Span Size", type: "text", values: value: "" }, //Limit degrees of lat/long shown
		//{ id: "sspn", text: "Search Span", type: "text", value: "" },
		{ id: "mrt", text: "Search Type", type: "select", values: [ { id: "", text: "Default"}, { id: "all", text: "All"}, { id: "loc", text: "Locations"}, { id: "Business Search", text: "yp"}, { id: "kmlkmz", text: "Community Maps"}, { id: "websearch", text: "Web Search"}, { id: "realestate", text: "Real Estate"} ] },
		{ id: "ll", text: "Lat/Long", type: "text", value: "" },
		{ id: "ssl", text: "Lat/Long Business Search", type: "text", value: "" },
		{ id: "t", text: "Map Type", type: "select", values: [ { id: "", text: "Default"}, { id: "m", text: "Standard" }, { id: "k", text: "Satellite"}, { id: "h", text: "Hybrid"}, { id: "p", text: "Terrain"} ] },
		{ id: "layer", text: "Overlay", type: "select", values: [ { id: "", text: "Default"}, { id: "t", text: "Traffic"}, { id: "c", text: "Street"}, { id: "tc", text: "Both"} ] },
		{ id: "saddr", text: "Source Address", type: "text", value: "" },
		{ id: "daddr", text: "Destination Address", type: "text", value: "" },
		{ id: "iwd", text: "Expanded View", type: "select", values: [ { id: "", text: "No"}, { id: "1", text: "Yes"} ] }
];

var getOptionHtml = function(option) {
	if(!option || !option.type )
		return;

	var html = "<div class='option'>";
		html += "	<label for='" + option.id + "'>" + option.text + "</label>";
	if(option.type == "text")
	{
		html += "	<input id='" + option.id + "' type='text' value='" + (option.value ? option.value : "") +"'>";
	} else if (option.type == "select") {
		html += "<select id='" + option.id + "'>";

		if(option.values) {
			for(var i = 0; i < option.values.length; i++) {
				var item = option.values[i];
				if(!item)
					continue;
				html += "<option id='" + item.id + "'>" + item.text + "</option>";
			}
		}

		html += "</select>";
	}
	html += "</div>";

	return html;
};

var buildForm = function() {
	var html = "";
	for(var i = 0; i < googleParams.length; i++) {
		html += getOptionHtml(googleParams[i]);
	}
	$("#content").html(html);
};

var createParams = function() {
	window.open($("#resultLink").href(), '_blank', '');
};

var generateUrl = function() {
	var url = "https://maps.google.com/";
	var params = "";

	for(var i = 0; i < googleParams.length; i++) {
		var option = googleParams[i];

		if(!option)
			continue;

		var control = $("#" + option.id);
		if(!control)
			continue;

		var val = "";

		if(control.is('input:text')) {
			val = $(control).val();
		} else {
			val = $(control).children(":selected").attr("id");
		}

		if(val && val != "") {
			if(params == "")
				params += "?"
			else
				params += "&";

			params += option.id + "=" + val.replace(' ', '+');
		}
	}

	return url + params;
};

var updateResultLink = function() {
	var url = generateUrl();

	$("#resultLink").html(url);
	$("#resultLink").attr("href", url);
};

$(function() {
	buildForm();

	$("input[type=text]").on("blur", function() {
		updateResultLink();
	});
	$("select").change(function() {
		updateResultLink();
	});

	$("#createParam").click(createParams);

	alert(generateUrl());
});