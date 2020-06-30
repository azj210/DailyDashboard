import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.conf.Configuration;

public class SpotifyDriver {

  public static void main(String[] args) throws Exception {
    if (args.length != 2) {
      System.err.println("Usage: SpotifyDriver <input path> <output path>");
      System.exit(-1);
    }

    final Configuration conf = new Configuration();
    conf.set("mapred.textoutputformat.separator", "|");
    Job job = Job.getInstance(conf);

    job.setJarByClass(SpotifyDriver.class);
    job.setJobName("SpotifyDriver");

    job.setNumReduceTasks(0);

    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));

    job.setMapperClass(SpotifyMap.class);

    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(Text.class);
    
    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}