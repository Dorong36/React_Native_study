<ScrollView
horizontal 
pagingEnabled 
showsHorizontalScrollIndicator = "false" 
contentContainerStyle={styles.weather}
>
{
    days === "null" ? (
    <View style={{width : windowWidth,
        alignItems : "center",}}><ActivityIndicator color="white" size="large"></ActivityIndicator></View>
    ) : (
    <View style={styles.day}>
        <View style={{
        flexDirection : "row", 
        alignItems : "center",
        justifyContent : "space-between"
        }}>
        <Text style={styles.temp}>
            {parseFloat(days.main.temp).toFixed(1)}
        </Text>
        <Fontisto name={icons[days.weather[0].main]} size={60} color="white" />
        {/* <Fontisto name={icons["Cloud"]} size={60} color="white" /> */}
        </View>
        <Text style={styles.description}>{days.weather[0].description}</Text>
    </View>
    )
}
</ScrollView>