import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "./star-icon";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopProductReview,
  postShopProductReview,
} from "@/store/shop-slice/product-review-slice";
import { useToast } from "@/hooks/use-toast";

export const ShowReview = ({ reviews, productId }) => {
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddReview = () => {
    dispatch(
      postShopProductReview({
        productId: productId,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      console.log(data);
      
      if (data.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getShopProductReview(productId));
        toast({
          title: "Review added successfully!",
        });
      } else {
        toast({
          title: "You already reviewed this product!",
        });
      }
    });
  };

  return (
    <div className="max-h-[500px] overflow-auto lg:border-l lg:pl-4">
      <p className="text-center font-medium text-lg">Customer Reviews</p>
      {reviews && reviews.length > 0 ? (
        reviews.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex flex-row gap-x-2 items-center">
                <Avatar
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                >
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="@shadcn"
                  />
                </Avatar>
                <p>{item.userName}</p>
              </div>
              <div className="text-justify lg:mx-4 my-2">
                {item.reviewMessage}
              </div>
              <Separator className="my-4" />
            </div>
          );
        })
      ) : (
        <h1>No Reviews</h1>
      )}
      <div className="mt-10 flex-col flex gap-2">
        <Label>Write a review</Label>
        <div className="flex gap-1">
          <StarRating rating={rating} handleRatingChange={handleRatingChange} />
        </div>
        <Input
          name="reviewMsg"
          value={reviewMsg}
          onChange={(event) => setReviewMsg(event.target.value)}
          placeholder="Write a review..."
        />
        <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
          Submit
        </Button>
      </div>
    </div>
  );
};
