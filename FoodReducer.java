package hadoop;

import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import java.lang.Math;

public class FoodReducer
    extends Reducer<Text, Text, Text, Text> {

  @Override
  public void reduce(Text key, Iterable<Text> values, Context context)
      throws IOException, InterruptedException {

          double serve_size_avg = 0;
          double calorie_avg = 0;
          double fat_avg = 0;
          double protein_avg = 0;
          double carb_avg = 0;
          double sugar_avg = 0;
          double num_items = 0;

          for (Text value : values) {
              String[] line = value.toString().split(";");

              // add value to total
              serve_size_avg += Double.parseDouble(line[0]);
              calorie_avg += Double.parseDouble(line[1]);
              fat_avg += Double.parseDouble(line[2]);
              protein_avg += Double.parseDouble(line[3]);
              carb_avg += Double.parseDouble(line[4]);
              sugar_avg += Double.parseDouble(line[5]);

              // count number of food items to get average
              num_items += 1;
          }

          // calculate average and round to 2 decimal points
          serve_size_avg = Math.round(serve_size_avg/num_items*100)/100;
          calorie_avg = Math.round(calorie_avg/num_items*100)/100;
          fat_avg = Math.round(fat_avg/num_items*100)/100;
          protein_avg = Math.round(protein_avg/num_items*100)/100;
          carb_avg = Math.round(carb_avg/num_items*100)/100;
          sugar_avg = Math.round(sugar_avg/num_items*100)/100;

          String avgs = Double.toString(serve_size_avg) + ";" + Double.toString(calorie_avg) + ";" +
        		  Double.toString(fat_avg) + ";" + Double.toString(protein_avg) + ";" +
        		  Double.toString(carb_avg) + ";" + Double.toString(sugar_avg)

          // key is food_key and value is all the averages
          context.write(key, new Text(avgs));

  		}
  }
