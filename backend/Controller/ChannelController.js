import Channel from "../model/ChannelModel.js"; // Import the Channel model to interact with MongoDB

// =========================
// Create a new channel
// =========================
export const createChannel = async (req, res) => {
  try {
    // Destructure values sent from the frontend request body
    const { channelName, description, channelIcon } = req.body; 
    // Get the logged-in user's ID from the JWT middleware
    const userId = req.user.userId;

    // Check if the user already has a channel
    const existingChannel = await Channel.findOne({ owner: userId });
    if (existingChannel) {
      // If a channel exists, return an error response
      return res.status(400).json({ message: "User already has a channel" });
    }

    // Create a new Channel document using the provided data
    const newChannel = new Channel({
      channelName,              // Name of the channel
      description,              // Description of the channel
      channelIcon: channelIcon || null, // Use provided icon or set null if none
      owner: userId,            // Assign the logged-in user as the channel owner
    });

    // Save the new channel to the database
    await newChannel.save();

    // Send a success response with the newly created channel details
    res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel,
    });
  } catch (error) {
    // Log any errors and send an internal server error response
    console.error("Error creating channel:", error);
    res.status(500).json({ message: "Error creating channel", error });
  }
};

// =========================
// Get a channel by its ID
// =========================
export const getChannelById = async (req, res) => {
  try {
    // Extract the channelId from URL parameters
    const { channelId } = req.params;
    // Find the channel by ID and populate the owner's email and username
    const channel = await Channel.findById(channelId).populate(
      "owner",
      "email username"
    );
    // If the channel doesn't exist, return a 404 response
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    // Send the channel data as JSON
    res.json(channel);
  } catch (error) {
    // Log and handle errors if the fetch fails
    console.error("Error fetching channel:", error);
    res.status(500).json({ message: "Error fetching channel", error });
  }
};

// ================================
// Get the channel of a logged-in user
// ================================
export const getChannelByUserId = async (req, res) => {
  try {
    // Get the logged-in user's ID from JWT middleware
    const userId = req.user.userId; 
    console.log("Fetching channel for user:", userId);

    // Find the channel whose owner matches the user ID
    const channel = await Channel.findOne({ owner: userId });
    // If no channel exists for this user, return a 404 response
    if (!channel) {
      return res.status(404).json({ message: "Channel not found for this user" });
    }
    // Send the found channel as JSON
    res.json(channel);
  } catch (error) {
    // Log and handle errors if fetching fails
    console.error("Error fetching user channel:", error);
    res.status(500).json({ message: "Error fetching user channel", error });
  }
};
