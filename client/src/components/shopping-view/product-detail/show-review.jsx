import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Reviews = [
  {
    name: "name 1",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message:
      "Step into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers.",
  },
  {
    name: "name 2",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message:
      "Step into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers.",
  },
  {
    name: "name 3",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message:
      "Step into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVersStep into the world of elegance and style with VogueVers. Let your individuality shine as you explore our exclusive collection. Dare to be bold, dare to be VogueVers",
  },
];

export const ShowReview = () => {
  return (
    <div className="max-h-[500px] overflow-auto lg:border-l lg:pl-4">
      <p className="text-center font-medium text-lg">Customer Reviews</p>
      {Reviews && Reviews.length > 0
        ? Reviews.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex flex-row gap-x-2 items-center">
                  <Avatar
                    src={item.avatar}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  >
                    <AvatarImage src={item.avatar} alt="@shadcn" />
                  </Avatar>
                  <p>name 1</p>
                </div>
                <div className="text-justify lg:mx-4 my-2">{item.message}</div>
                <Separator className="my-4" />
              </div>
            );
          })
        : null}
    </div>
  );
};
