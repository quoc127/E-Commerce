import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";0

export const StarRating = ({ rating, handleRatingChange }) => {
  return [1, 2, 3, 4, 5].map((star, index) => (
    <Button
      key={index}
      className={`p-2 mr-2 rounded-full transition-colors ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
};
