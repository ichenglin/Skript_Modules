# Minecraft_Skript-API
Check this out for API usage and examples.

# String Datas API
	+---------------------------------------------[USAGE]---------------------------------------------+

	Source: https://github.com/fireclaws9/Minecraft_Skript-API/blob/master/StringDatasAPI
	
	[New/Overwrite Data] stringDatasAPI_setData( DATA_NAME , DATA_VALUE , OLD_DATA [@NULLABLE] )
	[Remove Data] stringDatasAPI_removeData( OLD_DATA , DATA_NAME )
	[Get/Read Data] stringDatasAPI_getData( OLD_DATA , DATA_NAME )
	[Get Data Names] stringDatasAPI_getDataNames( OLD_DATA )
	[Check Data is Set] stringDatasAPI_isSet( OLD_DATA , DATA_NAME )
	
	+-------------------------------------------------------------------------------------------------+
	
	
	+--------------------------------------------[EXAMPLE]--------------------------------------------+
	# Example For Storing Player's Balance
	
	command /addOneToBalance:
		trigger:
			set {_oldBalance} to stringDatasAPI_getData({playerData::%UUID of executor%}, "BALANCE")
			# Read the balance of executor in text

			set {_oldBalance} to ({_oldBalance} parsed as number)
			# Parse the data from text to number

			set {_newBalance} to ({_oldBalance} + 1)
			# Get the new balance

			set {playerData::%UUID of player%} to stringDatasAPI_setData("BALANCE", "%{_newBalance}%")
			# Set the balance of executor

			set {_checkNewBalance} to stringDatasAPI_getData({playerData::%UUID of executor%}, "BALANCE")
			# Get the balance of executor again

			send "Your new balance: %{_checkNewBalance}%" to executor

	+-------------------------------------------------------------------------------------------------+


	+--------------------------------------------[EXAMPLE]--------------------------------------------+
	# Example For Storing Multiple Datas Together
	
	command /iWantSomeDatas:
		trigger:
			set {playerData::%UUID of executor%} to stringDatasAPI_setData("BALANCE", "0")
			set {playerData::%UUID of executor%} to stringDatasAPI_setData("HEALTH", "20", {playerData::%UUID of executor%})
			set {playerData::%UUID of executor%} to stringDatasAPI_setData("HUNGER", "20", {playerData::%UUID of executor%})
			set {playerData::%UUID of executor%} to stringDatasAPI_setData("IQ", "180", {playerData::%UUID of executor%})
			# Set data named BALANCE, HEALTH, HUNGER, and IQ for executor

	+-------------------------------------------------------------------------------------------------+
# Cubed API
	+---------------------------------------------[USAGE]---------------------------------------------+

	[Get Boosters List (Boost Time Optional)] cubedAPI_getBoosters( API_KEY , RETURN_UNIX_TIME_STAMP [@NULLABLE] )
	[Get Votes] cubedAPI_getVoters( API_KEY )
	
	+-------------------------------------------------------------------------------------------------+
	
	
	+--------------------------------------------[EXAMPLE]--------------------------------------------+
	# Example For Getting Boosters
	
	command /boosters:
		trigger:
			set {_boostersRaw::*} to cubedAPI_getBoosters("YOUR_SERVER_API_KEY_HERE", true)
			set {_boostersAmount} to ((amount of {_boostersRaw::*}) / 2)
			if {_boostersAmount} <= 0:
				send "&cThis server doesn't have any boosters! :(" to executor
				stop
			send "&aBoosters: (&e%{_boostersAmount}%&a)" to executor
			loop {_boostersAmount} times:
				set {_boosterID} to ((loop-number * 2) - 1)
				set {_dateID} to (loop-number * 2)
				set {_booster} to {_boostersRaw::%{_boosterID}%}
				set {_date} to {_boostersRaw::%{_dateID}%}
				send " &e##%loop-number% &a- &e%{_booster}% &a(&e%{_date}%&a)" to executor

	+-------------------------------------------------------------------------------------------------+
# Unix API
	+---------------------------------------------[USAGE]---------------------------------------------+

	[Date To Unix] unixAPI_dateToUnix( DATE )
	[Unix To Date] unixAPI_unixToDate( UNIX )
	
	+-------------------------------------------------------------------------------------------------+
