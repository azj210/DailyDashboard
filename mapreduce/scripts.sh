hdfs dfs -rm -r -f Cocktails
rm *.class
rm *.jar
hdfs dfs -mkdir Cocktails
hdfs dfs -mkdir Cocktails/input
hdfs dfs -put cocktail.txt Cocktails/input
javac -classpath `yarn classpath` -d . CocktailMap.java
javac -classpath `yarn classpath`:. -d . CocktailDriver.java

jar -cvf proj.jar *.class

hadoop jar proj.jar CocktailDriver /user/XXXXXX/Cocktails/input/cocktail.txt /user/XXXXXX/Cocktails/output

hdfs dfs -cat Cocktails/output/part-m-00000

hdfs dfs -rm -r -f Songs
rm *.class
rm *.jar
hdfs dfs -mkdir Songs
hdfs dfs -mkdir Songs/input
hdfs dfs -put songs.txt Songs/input
javac -classpath `yarn classpath` -d . SpotifyMap.java
javac -classpath `yarn classpath`:. -d . SpotifyDriver.java

jar -cvf proj.jar *.class

hadoop jar proj.jar SpotifyDriver /user/XXXXXX/Songs/input/songs.txt /user/XXXXXX/Songs/output

hdfs dfs -cat Songs/output/part-m-00000